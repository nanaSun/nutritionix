$(function(){
	var foods = new foodList([
	    new food({ title: 'web development', price: 200}),
	    new food({ title: 'web design', price: 250}),
	    new food({ title: 'photography', price: 100}),
	    new food({ title: 'coffee drinking', price: 10})
	]);
	var App = Backbone.View.extend({
        el: $('#main'),
        events:{
        	"click #search":"searchFood"
        },
        initialize: function(){
            this.total = $('#total span');
            this.list = $('#services');
            this.listenTo(foods, 'change', this.render);
            foods.each(function(food){
                var view = new foodView({ model: food });
                this.list.append(view.render().el);
            }, this); 
        },
        render: function(){
            var total = 0;
            _.each(foods.getChecked(), function(elem){
                total += elem.get('price');
            });
            this.total.text('$'+total);
            return this;
       	},
       	searchFood:function(){
       		var text=$("#searchText").val();
       		this.list.empty();
       		foods.forEach(function(food){
       			if(food.get("title")==="web design"){
       				var view = new foodView({ model: food });
                	this.list.append(view.render().el);
       			}
            }, this); 
       	}
    });
	new App();
});