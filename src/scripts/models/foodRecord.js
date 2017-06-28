var app=app||{};
var root=root||{};
app.LocalStorage=Backbone.LocalStorage;
root.localStorage=localStorage;
var foodRecord = Backbone.Model.extend({
    defaults:{
		foodRecord:[]
    },
    localStorage:new app.LocalStorage('foodRecord'),
    initialize:function(){
        var _=this,tmp=_.get("foodRecord");
    	this.foodRecordIds=root.localStorage.getItem("foodRecord").split(",");
    	this.foodRecordIds.forEach(function(id){
            tmp=tmp.concat(JSON.parse(root.localStorage.getItem("foodRecord-"+id))["foodRecord"]);
        });
        this.set("foodRecord",tmp);
    },
    addFood:function(food){
    	this.get("foodRecord").push(food);
    	this.save()
    },
    removeFood:function(index){
    	this.get("foodRecord").splice(1,index);
    },
    changeToDate:function(){
    	this.fetch({

    	});
    }
});
