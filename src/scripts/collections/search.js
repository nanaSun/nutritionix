 var app=app||{};
 app.searchList = Backbone.Collection.extend({
    model:  app.search,
    url:"",
    initialize: function(){
        this.fetchXRH=null;
    },
    getItems:function(word,callback){
        this.abortSearch();
    	this.url=app.url+":8888/?action=a&q="+word;
    	this.fetchXRH=this.fetch({
            reset:true,
            error:function(){
                callback();
            }
        });
    },
     //if there still has alive connection,abort it and then create new connection
    abortSearch:function(){
        if(this.fetchXRH!==null){
            this.fetchXRH.abort();
        }
    }
});

 