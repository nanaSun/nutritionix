 var app=app||{};
 app.foodView = Backbone.View.extend({
    tagName:'li',
    events:{
        'click .addToDiet':'editReadyToAddFood'
    },
    initialize: function(){
        this.detail=$("#detail");
        this.addDietPanel=$("#addDiet");
    },
    template:  _.template($("#food-list").html()),
    templateDetail: _.template($("#food-detail").html()),
    render: function(){
        console.log(this.model);
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
                _this.renderDetail();
            }
        });
    },
    editReadyToAddFood:function(){
        var _this=this;
        _this.fetchDetail();
        _this.addDietPanel.removeClass("hide");

    },
    addToDiet:function(){
        var _this=this
        Backbone.trigger('addFoodRecord',JSON.parse(JSON.stringify(_this.model.attributes)));
    }
});