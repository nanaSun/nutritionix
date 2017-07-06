 var app=app||{};
 app.foodRecordView = Backbone.View.extend({
    tagName:'li',
    events:{
        'click .seeMore': 'fetchDetail',
        'click .deleteDiet': 'deleteDiet'
    },
    initialize: function(){
        this.detail=$("#detail");
        this.listenTo(this.model, 'change', this.render);
        
    },
    template:  _.template($("#food-list").html()),
    templateDetail: _.template($("#food-detail").html()),

    render: function(){
        this.$el.html( this.template( {v:this.model.attributes.food,t:'record'} ) );
        return this;
    },
    fetchDetail:function(){
        console.log(this.model.attributes.food);
        this.detail.html( this.templateDetail( {v:this.model.attributes.food,t:'record'} ) );  
    },
    deleteDiet:function(){
        this.model.destroy();
        this.$el.remove();
    }
});