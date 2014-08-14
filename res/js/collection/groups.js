define([
	'backbone',
	'../models/groups'
],function(Backbone, modelGroups) {
	var collectionGroups = Backbone.Collection.extend({
		model: modelGroups,
		url: '/contacts.php'
	});
	
	return collectionGroups;
});