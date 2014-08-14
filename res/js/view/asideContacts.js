define([
	'backbone',
	'../view/asideContactsOne',
	'text!../../../templates/asideContacts.tpl'
],function(Backbone, itemView, templateAsideContacts) {
	var viewAsideContacts = Backbone.View.extend({
		template: _.template(templateAsideContacts),

		events: {
			'click #new': 'openNewUser'
		},

		initialize: function() {
			this.collection.on('add', this.renderOne, this);
			this.collection.on('change', this.render, this);
		},

		renderOne: function(contact){
			var contactItemView = new itemView({model: contact});
	  		this.$('.addressList').append(contactItemView.render().$el);
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

	return viewAsideContacts;
});

	