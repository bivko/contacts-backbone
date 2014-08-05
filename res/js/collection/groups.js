ContactManager.Collections.Groups = Backbone.Collection.extend({
	model: ContactManager.Models.Groups,
	url: '/contacts.php'
});