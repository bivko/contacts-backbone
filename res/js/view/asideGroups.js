define([
	'backbone',
	'../view/asideGroupsOne'
],function(Backbone, itemView) {
	
	var viewAsideGroups = Backbone.View.extend({
		tagName: 'select',

		initialize: function(options) {
			this.selectClass = options.selectClass || 'groupSelect';
			this.selectID = options.selectID || 'groups-list';
			this.collection.on('add', this.renderOne, this);
		},

		renderOne: function(group) {
			var groupOption = new itemView({model: group});
			this.$el.append(groupOption.render().$el);
		},

		render: function() {
			this.$el.addClass(this.selectClass).attr('id',this.selectID);
			this.collection.each(this.renderOne, this);
			return this;
		}
	});	

	return viewAsideGroups;
});