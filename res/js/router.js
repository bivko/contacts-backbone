define([
	'backbone'
],function(Backbone) {
	
	var router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'contact/new': 'newContact',
			'contact/eddit/:id': 'edditCurrentContact',
			'contact/:id': 'showCurrentContact'
		}
	});

	return router
});