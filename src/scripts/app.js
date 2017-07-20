var root=root||{};
var app=app||{};
function getDate(date){
    var year=date.getFullYear(),
        month=date.getMonth()+1,
        day=date.getDate();
        month=(month<10?"0":"")+month;
        day=(day<10?"0":"")+day;
    return year+"-"+month+"-"+day;
}
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
    //init day choose
    var today=new Date(),todayTime=today.getTime();
    var date=getDate(today);
    var days=[date];
    for(var i=1;i<=6;i++){
        days.push(getDate(new Date(todayTime-1000*24*60*60*i)));
    }
    $(".days").html(days.reduce(function(p,c){
        return "<li><a href=\"#foodRecordDate/"+c+"\">"+c.substr(8,2)+"</a></li>"+p;
    },""))
    console.log(days);
    root.localStorage=localStorage;
    $('.datepicker').val(date);
    app.router = new myRouter();
    Backbone.history.start();
})