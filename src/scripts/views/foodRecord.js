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
        var ids=root.localStorage.getItem('foodRecord'),id=this.model.attributes.id;
        root.localStorage.removeItem('foodRecord-'+id);
        console.log(this.model.attributes,ids);
        ids=ids.replace(","+id,"").replace(id,"");
        console.log(id,ids);
        root.localStorage.setItem('foodRecord',ids);
        this.$el.remove();
    }
});