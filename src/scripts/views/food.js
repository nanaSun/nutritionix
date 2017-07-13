 var app=app||{};
 app.foodView = Backbone.View.extend({
    tagName:'li',
    events:{
        'click .seeMore': 'fetchDetail',
        'click .addToDiet':'addToDiet'
    },
    initialize: function(){
        this.detail=$("#detail");
        this.render();
        this.listenTo(this.model, 'change:ingredient_statement', this.renderDetail);
    },
    template:  _.template($("#food-list").html()),
    templateDetail: _.template($("#food-detail").html()),
    render: function(){
         console.log("render");
        this.$el.html(this.template( {v:this.model.attributes,t:"new"} ) );
        return this;
    },
    renderDetail:function(){
         var _this=this;
         _this.detail.html( _this.templateDetail(  {v:_this.model.attributes,t:"new"} ) );
         return _this;
    },
    fetchDetail:function(callback){
        var _this=this,tmp=_this.model.attributes;
        _this.model.fetch({
            reset:true,
            url:_this.model.url+tmp.resource_id,
            success:function(){
                if(typeof callback!=="undefined") callback();
            }
        });
    },
    addToDiet:function(){
        var _this=this
        date=$("#date").val();
        date=date?date:app.date;
        Backbone.trigger('addFoodRecord',{"date":date,"food":JSON.stringify(_this.model.attributes)});
        
    }
});