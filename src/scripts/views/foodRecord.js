 var app=app||{};
app.LocalStorage=Backbone.LocalStorage;
 app.foodRecordView = Backbone.View.extend({
    tagName:'li',
    events:{
        'click .seeMore': 'directFoodDetail',
        'click .deleteDiet': 'deleteDiet'
    },
    initialize: function(){
        this.foodView=new app.foodView({ model: new app.food(JSON.parse(JSON.stringify(this.model.get("food"))))});
        
    },
    render:function(){
        return this.foodView.render();
    },
    deleteDiet:function(){
        this.$el.remove();
        Backbone.trigger('removeFoodRecord',this.model);
    }
});