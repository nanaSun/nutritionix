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
$('.datepicker').pickadate({
  formatSubmit:'yyyy-mm-dd',
  hiddenPrefix: 'date',
});
var myRouter = Backbone.Router.extend({
    initialize: function () {
    	this.app=new app.mainView();
    },
    routes: {
      "foodRecord":'foodRecord',
      "search/:value":'searchFood',
      "foodRecordDate/:date":'seachfoodRecordByDate',
      "foodDetail/:id":'seachfoodDetail'
    },
    foodRecord:function(){
    	this.app.foodRecord();
    },
    searchFood: function(value){
        this.app.searchFood(value);
    },
    seachfoodRecordByDate:function(date){
        this.app.foodRecordSearch(date);
    },
    seachfoodDetail:function(id){
        this.app.foodDetail(id);
    }
});
$(document).ready(function () {
    app.router = new myRouter();
    Backbone.history.start();
})