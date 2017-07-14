 var app=app||{};

    app.LocalStorage=Backbone.LocalStorage;
 app.foodRecordView = Backbone.View.extend({
    tagName:'li',
    events:{
        'click .seeMore': 'fetchDetail',
        'click .deleteDiet': 'deleteDiet'
    },
    initialize: function(){
        this.detail=$("#detail");
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'reset', this.renderDetail);
    },
    template:  _.template($("#food-list").html()),
    templateDetail: _.template($("#food-detail").html()),
    render: function(){
        this.$el.html( this.template( {v:this.model.attributes.food,t:'record'} ) );
        return this;
    },
    renderDetail:function(){
        this.detail.html( this.templateDetail( {v:this.model.attributes.food,t:'record'} ) );  
    },
    deleteDiet:function(){
        this.$el.remove();
        Backbone.trigger('removeFoodRecord',this.model);
    },
    fetchDetail:function(){
        var _this=this,tmp=_this.model.attributes;
        _this.model.fetch({
            reset:true
        });
    }
});