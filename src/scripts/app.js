root.localStorage=localStorage;
var myRouter = Backbone.Router.extend({
    initialize: function () {
    	this.app=new app.mainView();
    },
    routes: {
      "foodRecord":'foodRecord',
      "search/:value":'searchFood',
      "foodDetail/:viewid":"foodDetail"
    },
    foodRecord:function(){
    	this.app.foodRecord();
    },
    foodDetail: function (viewid) {

      this.app.foodDetail(viewid)
    },
    searchFood: function(value){
      console.log(value);
      this.app.searchFood(value);
    }
});
$(document).ready(function () {
    app.router = new myRouter();
    Backbone.history.start();
})