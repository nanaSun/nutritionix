var root=root||{};
function getDate(date){
    var year=date.getFullYear(),
        month=dateTmp.getMonth()+1,
        day=dateTmp.getDate();
        month=(month<10?"0":"")+month;
        day=(day<10?"0":"")+day;
    return year+"-"+month+"-"+day;
}
var dateTmp=new Date();
app.date=getDate(dateTmp);
root.localStorage=localStorage;
var myRouter = Backbone.Router.extend({
    initialize: function () {
    	this.app=new app.mainView();
    },
    routes: {
      "foodRecord":'foodRecord',
      "search/:value":'searchFood',
      "foodRecordDate/:date":'seachfoodRecordByDate'
    },
    foodRecord:function(){
    	this.app.foodRecord();
    },
    searchFood: function(value){
      console.log(value);
      this.app.searchFood(value);
    },
    seachfoodRecordByDate:function(date){
        this.app.foodRecordSearch(date);
    }
});
$(document).ready(function () {
    app.router = new myRouter();
    Backbone.history.start();
})