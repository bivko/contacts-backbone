ContactManager.Collections.Contacts = Backbone.Collection.extend({
	model: ContactManager.Models.Contacts,
	url: '/contacts.php'
});