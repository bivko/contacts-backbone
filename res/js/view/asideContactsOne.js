define([
	'backbone',
	'text!../../../templates/asideContactsOne.tpl'
],function(Backbone, templateAsideContactsOne) {
	
	var viewAsideContactsOne = Backbone.View.extend({
		tagName: 'li',
		className: 'item',
		template: _.template(templateAsideContactsOne),

		events: {
			'click .aside-contacts-link': 'onOpenUser'
		},

		initialize: function() {
			this.listenTo(this.model, "remove", this.remove);
		},

		render: function(){
			var html = this.template(this.model.toJSON());
			this.$el.html(html);
			return this;
		},

		onOpenUser: function(e){
			var elem = $(this.el).find('.aside-contacts-link');

			if(!elem.hasClass('active')){
				$('.aside-contacts-link.active').removeClass('active');
				elem.addClass('active');
			}
		}
	});
	return viewAsideContactsOne;
});