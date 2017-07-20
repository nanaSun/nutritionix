 var app=app||{};
 app.foodList = Backbone.Collection.extend({
    // Will hold objects of the Service model
    model:  app.food,
    url:"",
    // Return an array only with the checked services
    getChecked: function(){
        return this.where({checked:true});
    },
    getItems:function(word,callback){
    	this.url="http://172.27.6.130:8888/?action=s&q="+word;
    	this.fetch({reset:true});
    },
    search:function(word){
    	return this.filter(function(i){
    		return i.get("title")===word;
    	})
    }
});

 