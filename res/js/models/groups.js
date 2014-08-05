ContactManager.Models.Groups = Backbone.Model.extend({
	defaults: {
		id: null,
		name: null
	},
	urlRoot: '/contacts.php',

	initialize: function() {

	}
});