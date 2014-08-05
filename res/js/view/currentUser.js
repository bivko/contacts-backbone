ContactManager.Views.CurrentUser = Backbone.View.extend({
	template: _.template($('#tpl-currnet-user').html()),

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