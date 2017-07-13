var app=app||{};
app.LocalStorage=Backbone.LocalStorage;
app.foodRecord = Backbone.Model.extend({
    defaults:{
        date:app.date,
		food:""
    },
    localStorage:new app.LocalStorage('foodRecord'),
    initialize: function(){
        if(this.get("food")!==""){
            this.save();
            this.set("food",JSON.parse(this.get("food")));
        }
        this.on('destroy', this.delete);
    },
    delete:function(){
        console.log("delete",this.get("date"),this.get("food"))
    }
});
