define([
	'backbone'
],function(Backbone) {
	var modelContacts = Backbone.Model.extend({
		defaults: {
			id: null,
			name: null,
			mail: null,
			phone: null,
			group: null
		},
		urlRoot: '/contacts.php'
	});	

	return modelContacts;
});