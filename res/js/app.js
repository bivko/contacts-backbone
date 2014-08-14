define([
	'backbone',

	'./models/contacts',
	'./models/groups',
	
	'./collection/contacts',
	'./collection/groups',

	'./view/addNewUser',
	'./view/asideGroups',
	'./view/asideContacts',
	'./view/currentUser',

	'./router',
	'./search'

],function(Backbone, modelContacts, modelGroups, collectionContacts, collectionGroups, viewAddUser, viewAsideGroups, viewAsideContacts, viewShowUser, appRouter) {
	
	var start = function (){
		var contactsList = new collectionContacts(),
			groupsList = new collectionGroups();

		contactsList.fetch({
			add: true,
			data: {type: 'getAll'}
		});

		groupsList.fetch({
			add: true,
			data: {type: 'getAllGroups'}
		});

		var router = new appRouter(),
			contactsView = new viewAsideContacts({collection: contactsList}),
			groupsView = new viewAsideGroups({collection: groupsList});

		$('.aside-contacts-list').html(contactsView.render().$el);
		$('.aside-filters').html(groupsView.render().$el);

		router.on('route:home', function(){
			var emptyUserView = new viewShowUser({
				model: new modelContacts
			});
			$('.main-container').html(emptyUserView.render().$el);
		})

		router.on('route:showCurrentContact', function(id){
			var user = contactsList.get(id);
			if(user){
				var currentUserView = new viewShowUser({model: user});
				$('.main-container').html(currentUserView.render().$el);

				currentUserView.on('remove:currentUser', function(){
					user.destroy({
						contentType: 'application/json',
						data: JSON.stringify({contactID: id}),
						wait: true,
						success: function(model, resp) {
							if(resp){
								router.navigate('',true);
							}
						}
					});
				});
			}else{
				router.navigate('',true);
			}
		})

		router.on('route:edditCurrentContact', function(id){
			var editUser = contactsList.get(id);
			if(editUser){
				var editUserView = new viewAddUser({
					model: editUser,
					groupsCollection: groupsList
				});
				
				$('.main-container').html(editUserView.render().$el);

				editUserView.on('submit:addNewUser', function(attrs, isNew){
					attrs.id = id;
					attrs.isNew = isNew;
					contactsList.set(attrs, {remove: false});
					editUser.save();
					router.navigate('contact/'+attrs.id,true);
				});
			}
		})

		router.on('route:newContact', function(){
			var newUserView = new viewAddUser({
				model: new modelContacts,
				groupsCollection: groupsList
			});
			$('.main-container').html(newUserView.render().$el);

			newUserView.on('submit:addNewUser', function(attrs, isNew){
				attrs.isNew = isNew;
				attrs.id = contactsList.isEmpty() ? 1 : (+ _.max(contactsList.pluck('id')) + 1);
				contactsList.create(attrs,{
				 	wait : true,
				 	success : function(model, resp, options){
						router.navigate('contact/'+attrs.id,true);
						$('.aside-contacts-link:last').addClass('active');
					},
					error : function(err) {
						console.log('error callback', err);
					}
				 });
			});
		})

		Backbone.history.start();
	}

	return {
		start: start
	}
});