ContactManager.Models.Contacts = Backbone.Model.extend({
	defaults: {
		id: null,
		name: null,
		mail: null,
		phone: null,
		group: null
	},
	urlRoot: '/contacts.php',

	initialize: function() {
	}
});