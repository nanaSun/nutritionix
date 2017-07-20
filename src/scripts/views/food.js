 var app=app||{};
 app.foodView = Backbone.View.extend({
    tagName:'li',
    events:{
        'click .seeMore': 'directFoodDetail',
        'click .addToDiet':'addToDiet'
    },
    initialize: function(){
        console.log(this.model.attributes);
        this.detail=$("#detail");
    },
    template:  _.template($("#food-list").html()),
    templateDetail: _.template($("#food-detail").html()),
    render: function(){
        this.$el.html(this.template( {v:this.model.attributes,t:"new"} ) );
        return this;
    },
    renderDetail:function(){
         var _this=this;
         _this.detail.html( _this.templateDetail(  {v:_this.model.attributes,t:"new"} ) );
         return _this;
    },
    directFoodDetail:function(){
        app.router.navigate("foodDetail/"+this.model.get("resource_id"),{trigger: true});
    },
    fetchDetail:function(callback){
        var _this=this,tmp=_this.model.attributes;
         console.log(_this.model.attributes);
        _this.model.fetch({
            reset:true,
            url:_this.model.url+tmp.resource_id,
            success:function(){
                _this.renderDetail();
            }
        });
    },
    addToDiet:function(){
        var _this=this
        Backbone.trigger('addFoodRecord',JSON.parse(JSON.stringify(_this.model.attributes)));
    }
});