var root=root||{};
var app=app||{};
app.url="http://localhost";//
/**
* @description get formate date
* @param {date} date - The date you need to formate
*/
function getDate(date){
    var year=date.getFullYear(),
        month=date.getMonth()+1,
        day=date.getDate();
        month=(month<10?"0":"")+month;
        day=(day<10?"0":"")+day;
    return year+"-"+month+"-"+day;
}
/**
* @description the website router manage
* @constructor
*/
var myRouter = Backbone.Router.extend({
    initialize: function () {
    	this.app=new app.mainView();
        this.serachPanel=$(".serachDiv");
        this.tool=$("#tool");
        this.period=$("#period");
        this.calendar=$(".days");
        this.list=$("#services");
        this.detail=$("#detail");
        this.searchText=$("#searchText");
        this.searchList=$(".searchList");
        this.total=$("#totalCal");
        var today=new Date(),todayTime=today.getTime();
        this.today=getDate(today);
        var days=[this.today];
        for(var i=1;i<=6;i++){
            days.push(getDate(new Date(todayTime-1000*24*60*60*i)));
        }
        this.calendar.html(days.reduce(function(p,c,i){
            return "<li data-day=\""+c+"\"><a href=\"#foodRecordDate/"+c+"\">"+c.substr(8,2)+"</a></li>"+p;
        },""));
        $('.datepicker').val(this.today);
    },
    init:function(){
        this.serachPanel.addClass("hide");
        this.calendar.addClass("hide");
        this.tool.addClass("hide");
        this.searchList.addClass("hide");
        this.total.addClass("hide");
        this.list.empty();
        this.searchList.empty();
        this.detail.empty();
    },
    routes: {
      "":'seachfoodRecordByDate',
      "startSearch/:period":'startSearch',
      "search/:value":'searchFood',
      "foodRecordDate/:date":'seachfoodRecordByDate'
    },
    /**
    * @description After you choose one period
    * @param {int} value - period's id
    */
    startSearch:function(value){
        this.init();
        this.serachPanel.removeClass("hide");
        this.period.val(value);
    },
    /**
    * @description After you enter the word you need to search
    * @param {string} value - the word you need to search
    */
    searchFood: function(value){
        this.init();
        this.searchText.val(value);
        this.serachPanel.removeClass("hide");
        this.app.searchFood(value);
    },
    /**
    * @description see your food record by date
    * @param {string} date - the date you need to check
    */
    seachfoodRecordByDate:function(date){
        if(!date) date=this.today;
        this.init();
        this.tool.removeClass("hide");
        this.calendar.removeClass("hide");
        this.total.removeClass("hide");
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
    root.localStorage=localStorage;
    $(".closeAddDiet").bind("click",function(){
        $("#addDiet").addClass("hide");
        $("#quanity").val(1);

    });
    $(".openTool").bind("click",function(){
        $(".toolList").toggleClass("active");
    });
    app.router = new myRouter();
    Backbone.history.start();
});