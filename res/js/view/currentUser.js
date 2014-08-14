define([
	'backbone',
	'text!../../../templates/currentUser.tpl'
],function(Backbone, templateCurrentUser) {
	var viewCurrentUser = Backbone.View.extend({
		template: _.template(templateCurrentUser),

		events: {
			'click #edit': 'goToEditUser',
			'click #remove': 'removeCurrentUser'
		},

		render: function() {
			var html = this.template(_.extend(this.model.toJSON(), {
				isNew: this.model.isNew()
			}));
			this.$el.html(html);
			return this;
		},

		goToEditUser: function() {
			window.location.hash = 'contact/eddit/'+$('#edit').data('id');
		},

		removeCurrentUser: function() {
			this.trigger('remove:currentUser');
		}
	});

	return viewCurrentUser;
});