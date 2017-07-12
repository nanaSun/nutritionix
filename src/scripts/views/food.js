 var app=app||{};
 app.foodView = Backbone.View.extend({
    tagName:'li',
    events:{
        'click .seeMore': 'fetchDetail',
        'click .addToDiet':'addToDiet'
    },
    initialize: function(){
        this.detail=$("#detail");
        this.listenTo(this.model, 'change', this.render);
    },
    template:  _.template($("#food-list").html()),
    templateDetail: _.template($("#food-detail").html()),
    render: function(){
        this.$el.html(this.template( {v:this.model.attributes,t:'new'} ) );
        return this;
    },
    fetchDetail:function(callback){
        var _this=this,tmp=this.model.attributes;
        _this.model.fetch({
            reset:true,
            url:_this.model.url+tmp.resource_id,
            success:function(){
                _this.detail.html( _this.templateDetail(  {v:_this.model.attributes,t:'new'} ) );
               
                if(typeof callback==="function"){
                    callback();
                }
            }
        });
        
    },
    addToDiet:function(){
        var _this=this
        date=$("#date").val();
        date=date?date:app.date;
        _this.fetchDetail(function(){
            Backbone.trigger('addFoodRecord',{"date":date,"food":JSON.stringify(_this.model.attributes)});
        })
        
    }
});