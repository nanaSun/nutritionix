 var app=app||{};
app.LocalStorage=Backbone.LocalStorage;
 app.foodRecordView = Backbone.View.extend({
    tagName:'li',
    events:{
        'click .deleteDiet': 'deleteDiet'
    },
    template:  _.template($("#food-list").html()),
    initialize: function(){
        this.model.get("food").type="record";
    },
    render:function(){
        this.$el.html(this.template(this.model.get("food")) );
        return this;
    },
    deleteDiet:function(){
        this.$el.remove();
        Backbone.trigger('removeFoodRecord',this.model);
    }
});