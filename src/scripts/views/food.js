 var app=app||{};
 app.foodView = Backbone.View.extend({
    tagName:'li',
    events:{
        'click li': 'fetchDetail',
        'click .addToDiet':'addToDiet'
    },
    initialize: function(){
        this.detail=$("#detail");
        this.listenTo(this.model, 'change', this.render);
    },
    template:  _.template( $('#item-service').html()),
    templateDetail: _.template( $('#item-detail').html()),
    render: function(){
        this.$el.html( this.template( this.model.attributes ) );
        return this;
    },
    fetchDetail:function(){
        var _=this,tmp=this.model.attributes;
        _.model.fetch({
            reset:true,
            url:_.model.url+tmp.resource_id,
            success:function(){
                _.detail.html( _.templateDetail( _.model.attributes ) );
            }
        });
        
    },
    addToDiet:function(){
         console.log(app.diet);
         app.diet.addFood(JSON.stringify(this.model.attributes));
         console.log(app.diet);
    }
});