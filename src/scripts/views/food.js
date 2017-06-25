var foodView = Backbone.View.extend({
    tagName: 'li',
    events:{
        'click': 'toggleService'
    },
    initialize: function(){
        this.listenTo(this.model, 'change', this.render);
    },
    todoTpl: _.template( $('#item-service').html() ),
    render: function(){
        this.$el.html( this.todoTpl( this.model.attributes ) );
        this.$('input').prop('checked', this.model.get('checked'));
        return this;
    },
    toggleService: function(){
        this.model.toggle();
    }
});