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
    	console.log("foodRecord",this.app);
    	this.app.foodRecord();
    },
    foodDetail: function (viewid) {
      this.app.foodDetail(viewid)
    },
    searchFood: function(value){
      this.app.searchFood(value)
    }
});
$(document).ready(function () {
    router = new myRouter();
    Backbone.history.start();
})