ContactManager.Views.Contacts = Backbone.View.extend({
	template: _.template($('#tpl-contacts-aside').html()),

	events: {
		'click #new': 'openNewUser'
	},

	initialize: function() {
		this.collection.on('add', this.renderOne, this);
		this.collection.on('change', this.render, this);
	},

	renderOne: function(contact){
		var itemView = new ContactManager.Views.ContactsAsideOne({model: contact});
  		this.$('.addressList').append(itemView.render().$el);
	},

	render: function() {
		var html = this.template();
		this.$el.html(html);
		this.collection.each(this.renderOne, this);
		return this;
	},

	openNewUser: function(){
		$('.aside-contacts-link.active').removeClass('active');
		window.location.hash = 'contact/new';
	}
});