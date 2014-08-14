define([
	'backbone',
	'../models/contacts'
],function(Backbone, modelContacts) {
	var collectionContacts = Backbone.Collection.extend({
		model: modelContacts,
		url: '/contacts.php'
	});
	
	return collectionContacts;
});