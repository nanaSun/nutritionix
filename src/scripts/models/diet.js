var app=app||{};
var diet = Backbone.Model.extend({
    defaults:{
        date:"",
		food:[]
    },
    addFood:function(food){
    	this.get("food").push(food);
    	console.log(this.get("food"));
    },
    removeFood:function(index){
    	this.get("food").splice(1,index);
    },
    changeToDate:function(){
    	this.fetch({

    	});
    }
});
