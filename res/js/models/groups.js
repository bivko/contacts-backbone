define([
	'backbone'
],function(Backbone) {	
	var modelGroups = Backbone.Model.extend({
		defaults: {
			id: null,
			name: null
		},
		urlRoot: '/contacts.php'
	});

	return modelGroups;
});