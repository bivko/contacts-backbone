define([
	'backbone',
	'text!../../../templates/addNewUser.tpl',
	'../view/asideGroups'
],function(Backbonem, templateAddNewUser, viewGroups) {
	
	var viewAddNewUser = Backbone.View.extend({
		tagName: 'form',
		className: 'addNewUser',
		attributes: {
			action: 'contacts.php'
		},
		template: _.template(templateAddNewUser),

		events: {
			'click #cancel': 'goBackToHome',
			'submit': 'addNewUser'
		},

		initialize: function (options) {
	        this.groupsCollection = options.groupsCollection;
	    },

		render: function(options) {
			var html = this.template(_.extend(this.model.toJSON(), {
				isNew: this.model.isNew()
			}));
			this.$el.html(html);
			this.renderGroupsSelect();
			return this;
		},

		goBackToHome: function() {
			var hash = window.location.hash,
				setHash = ( hash === '#contact/new') ? '': (hash.split('/')[0] + '/' + hash.split('/')[2]);
			
			window.location.hash = setHash;
		},

		addNewUser: function(e) {
			e.preventDefault();
			var form = $('.addNewUser');
			this.trigger('submit:addNewUser',{
				name: form.find('#name').val(),
				mail: form.find('#mail').val(),
				phone: form.find('#phone').val(),
				group: form.find('#groups-select').val()
			},this.model.isNew());
		},

		renderGroupsSelect: function() {
			var currentGroup = this.model.get('group');

			groupsView = new viewGroups({
				collection: this.groupsCollection,
				selectClass: 'groups-select-add',
				selectID: 'groups-select'
			});

			this.$('.group').html(groupsView.render().$el).find('option').each(function() {
				var elem = $(this);
				if(elem.text() === currentGroup ){
					elem.prop("selected", true);	
					return false;
				}
			});
		}
	});

	return viewAddNewUser;
});