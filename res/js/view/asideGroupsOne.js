ContactManager.Views.AsideGroupsOne = Backbone.View.extend({
	tagName: 'option',
	
	render: function(){
		this.$el.html(this.model.get('name'));
		return this;
	}
});