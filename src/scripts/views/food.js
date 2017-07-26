 var app=app||{};
 app.foodView = Backbone.View.extend({
    tagName:'li',
    events:{
        'click .addToDiet':'editReadyToAddFood',
        'click .deleteDiet': 'deleteDiet'
    },
    initialize: function(){
        var _this=this;
        _this.detail=$("#detail");
        _this.addDietPanel=$("#addDiet");
        _this.model.on("change:num", function(model, name) {
            _this.detail.find(".ttlqty").html(model.get("num")*model.get("serving_qty"));
            _this.detail.find(".cal").html(model.get("num")*model.get("nutrient_value"));
        });
    },
    template:  _.template($("#food-list").html()),
    templateDetail: _.template($("#food-detail").html()),
    render: function(){
        this.$el.html(this.template(this.model.attributes) );
        return this;
    },
    renderDetail:function(){
         var _this=this;
         _this.detail.html( _this.templateDetail(_this.model.attributes) );
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
        //_this.fetchDetail();
        _this.renderDetail();
         Backbone.trigger('editFood',_this.model.get("resource_id"));
        _this.addDietPanel.removeClass("hide");

    },
    addToDiet:function(){
        var _this=this
        Backbone.trigger('addFoodRecord',JSON.parse(JSON.stringify(_this.model.attributes)));
    },
    setNum:function(num){
        console.log(num);
        //this.model.set("num",num);
    },
    deleteDiet:function(){
        this.$el.remove();
        Backbone.trigger('removeFoodRecord',this.model);
    }
});