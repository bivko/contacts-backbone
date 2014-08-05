ContactManager.Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'contact/new': 'newContact',
		'contact/eddit/:id': 'edditCurrentContact',
		'contact/:id': 'showCurrentContact'
	}
});