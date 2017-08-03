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
    	this.url=app.url+":8888/?action=s&q="+word;
    	this.fetch({
            reset:true,
            error:function(){
                callback();
            }
        });
    },
    search:function(word){
    	return this.filter(function(i){
    		return i.get("title")===word;
    	});
    },
    searchID:function(resource_id){
        return this.filter(function(i){
            return i.get("resource_id")===resource_id;
        });
    }
});

 