$(function(){
	var foods = new app.foodList([]);
  app.foodRecords=new app.foodRecordList();
   root.localStorage=localStorage;
  var foodRecordIds=root.localStorage.getItem('foodRecord');
    if(foodRecordIds!=null){
        foodRecordIds.split(",").forEach(function(id){
            var data=root.localStorage.getItem('foodRecord-'+id);
            app.foodRecords.push(new app.foodRecord(JSON.parse(data)));
        })
    }
    console.log(app.foodRecords);
	var App = Backbone.View.extend({
        el: $('#main'),
        events:{
        	"click #search":"searchFood"
        },
        initialize: function(){
            this.searchInput=$("#searchText");
            this.list=$("#services");
            this.listenTo( foods, 'reset', this.render );
            this.render();
        },
        render: function(){
            var fragment= $(document.createDocumentFragment());
            this.list.empty();
            foods.each(function(food){
                var view = new app.foodView({ model: food});
                fragment.append(view.render().el);
            }, this); 
            this.list.append(fragment);
            return this;
       	},
       	searchFood:function(){
          var _=this;
       		foods.getItems(this.searchInput.val(),function(){
            _.render();
          });
       	}
    });
	new App();
});