window.ContactManager = {
	Models: {},
	Collections: {},
	Views: {},

	start: function() {
		var contactsList = new ContactManager.Collections.Contacts(),
			groupsList = new ContactManager.Collections.Groups();

		contactsList.fetch({
			add: true,
			data: {type: 'getAll'}
		});

		groupsList.fetch({
			add: true,
			data: {type: 'getAllGroups'}
		});

		var router = new ContactManager.Router(),
			contactsView = new ContactManager.Views.Contacts({collection: contactsList}),
			groupsView = new ContactManager.Views.Groups({collection: groupsList});

		$('.aside-contacts-list').html(contactsView.render().$el);
		$('.aside-filters').html(groupsView.render().$el);

		router.on('route:home', function(){
			var emptyUserView = new ContactManager.Views.CurrentUser({
				model: new ContactManager.Models.Contacts
			});
			$('.main-container').html(emptyUserView.render().$el);
		})

		router.on('route:showCurrentContact', function(id){
			var user = contactsList.get(id);
			if(user){
				var currentUserView = new ContactManager.Views.CurrentUser({model: user});
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
				var editUserView = new ContactManager.Views.AddNewUser({
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
			var newUserView = new ContactManager.Views.AddNewUser({
				model: new ContactManager.Models.Contacts,
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
						console.log('error callback');
					}
				 });
			});
		})

		Backbone.history.start();
	}
};
