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
        this.serachPanel=$(".serachDiv");
        this.tool=$("#tool");
        this.period=$("#period");
        this.calendar=$(".days");
        this.list=$("#services");
        this.detail=$("#detail");
        var today=new Date(),todayTime=today.getTime();
        var date=getDate(today);
        var days=[date];
        for(var i=1;i<=6;i++){
            days.push(getDate(new Date(todayTime-1000*24*60*60*i)));
        }
        this.calendar.html(days.reduce(function(p,c,i){
            return "<li data-day=\""+c+"\"><a href=\"#foodRecordDate/"+c+"\">"+c.substr(8,2)+"</a></li>"+p;
        },""));
        $('.datepicker').val(date);
        this.seachfoodRecordByDate(date);
    },
    init:function(){
        this.period.val(0);
        this.serachPanel.addClass("hide");
        this.calendar.addClass("hide");
        this.tool.addClass("hide");
        this.list.empty();
        this.detail.empty();
    },
    routes: {
      "startSearch/:period":'startSearch',
      "search/:value":'searchFood',
      "foodRecordDate/:date":'seachfoodRecordByDate'
    },
    startSearch:function(value){
        this.init();
        this.serachPanel.removeClass("hide");
        this.period.val(value);
    },
    searchFood: function(value){
        this.init();
        this.serachPanel.removeClass("hide");
        this.app.searchFood(value);
    },
    seachfoodRecordByDate:function(date){
        this.init();
        this.tool.removeClass("hide");
        this.calendar.removeClass("hide");
        this.calendar.find("li").each(function(index,item){
            if(date===$(item).data("day")){
                $(item).addClass("cur");
            }else{
                $(item).removeClass("cur");
            }
        });
        this.app.foodRecordSearch(date);
    }
});
$(document).ready(function () {
    //init day choose

    root.localStorage=localStorage;
    $("#addDiet").bind("touchstart",function(e){
        return false;
    })
    app.router = new myRouter();
    Backbone.history.start();
})