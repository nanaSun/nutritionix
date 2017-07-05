$(function(){
  root.localStorage=localStorage;
	new app.mainView();
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