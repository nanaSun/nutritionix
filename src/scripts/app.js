$(function(){
	var foods = new app.foodList([]);
  app.foodRecords=new app.foodRecordList();
  root.localStorage=localStorage;
  var foodRecordIds=root.localStorage.getItem('foodRecord');
	var App = Backbone.View.extend({
        el: $('#main'),
        events:{
        	"click #search":"searchFood"
        },
        initialize: function(){
            this.searchInput=$("#searchText");
            this.list=$("#services");
            this.listenTo( foods, 'reset', this.render );
            var fragment= $(document.createDocumentFragment());
            if(foodRecordIds!=null){
                foodRecordIds.split(",").forEach(function(id){
                    var data=root.localStorage.getItem('foodRecord-'+id);
                    var food=new app.foodRecord(JSON.parse(data));
                    app.foodRecords.push(food);
                    var view = new app.foodRecordView({ model: food});
                    fragment.append(view.render().el);
                });
                this.list.append(fragment);
            }
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
// var myRouter = Backbone.Router.extend({
//     initialize: function () {
//     },
//     routes: {
//       "search/:value":'searchFood',
//       "foodDetail/:viewid":"foodDetail"
//     },
//     foodDetail: function (viewid) {
//       console.log(viewid);
//     },
//     searchFood: function(value){
//       console.log(value);
//     }
// });
// $(document).ready(function () {
//     router = new myRouter();
//     Backbone.history.start();
// })