var app=app||{}
app.searchView = Backbone.View.extend({
	tagName:'li',
	events:{
	    'click': 'search'
	},
	initialize: function(){

	},
	render:function(){
	    this.$el.html(this.model.get("text"));
	    return this;
	},
	search:function(){
	     app.router.navigate("search/"+this.model.get("text"), {trigger: true});
	}
});