var app=app||{};
app.LocalStorage=Backbone.LocalStorage;
app.foodRecord = Backbone.Model.extend({
    defaults:{
        date:app.date,
		food:""
    },
    urlRoot: 'http://localhost:3000/',
    sync: function (method, model, options) {
        options || (options = {});
        switch(method){
            case "read":
                options.url=this.urlRoot+"?action=read&id="+this.get("id");break;
            case "delete": 
                options.url=this.urlRoot+"?action=delete&id="+this.get("id");break;
            case "update": 
                options.url=this.urlRoot+"?action=update&id="+this.get("id");break;
            case "create":
                options.url=this.urlRoot+"?action=create";break;
        }
        return Backbone.sync.apply(this, arguments);
    },
    localStorage:new app.LocalStorage('foodRecord'),
    initialize: function(){
        if(this.get("food")!==""){
        }
        this.on('destroy', this.delete);
    },
    delete:function(){
        console.log("delete",this.get("date"),this.get("food"))
    }
});
