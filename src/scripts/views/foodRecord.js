 var app=app||{};
app.LocalStorage=Backbone.LocalStorage;
 app.foodRecordView = Backbone.View.extend({
    tagName:'li',
    events:{
        'click .seeMore': 'directFoodDetail',
        'click .deleteDiet': 'deleteDiet'
    },
    initialize: function(){
        var _this=this;
        var food=JSON.parse(JSON.stringify(_this.model.get("food")));
        food.type="record";
        _this.foodView=new app.foodView({ model: new app.food(food)});
        console.log(_this.foodView.$el.find(".deleteDiet"));
        _this.foodView.$el.find(".deleteDiet").bind("click",function(){
            console.log("")
            _this.deleteDiet();
        })
    },
    render:function(){
        return this.foodView.render();
    },
    deleteDiet:function(){
        this.foodView.$el.remove();
        Backbone.trigger('removeFoodRecord',this.model);
    }
});