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
        this.addDietPanel=$("#addDiet");
        this.period=$("#period");
        this.searchInput=$("#searchText");
        var today=new Date(),todayTime=today.getTime();
        var date=getDate(today);
        var days=[date];
        for(var i=1;i<=6;i++){
            days.push(getDate(new Date(todayTime-1000*24*60*60*i)));
        }
        $(".days").html(days.reduce(function(p,c,i){
            return "<li data-day=\""+c+"\"><a href=\"#foodRecordDate/"+c+"\">"+c.substr(8,2)+"</a></li>"+p;
        },""));
        $('.datepicker').val(date);
        this.init();
    },
    init:function(){
        this.period.val(0);
        this.addDietPanel.addClass("hide");
    },
    routes: {
      "foodRecord":'foodRecord',
      "addDiet/:period":'addDiet',
      "search":'search',
      "search/:value":'searchFood',
      "foodRecordDate/:date":'seachfoodRecordByDate',
      "foodDetail/:id":'seachfoodDetail'
    },
    addDiet:function(value){
        this.init();
        this.period.val(value);
        this.addDietPanel.removeClass("hide");
    },
    foodRecord:function(){
        this.init();
    	this.app.foodRecord();
    },
    search:function(){
        app.router.navigate("search/"+this.searchInput.val(), {trigger: true});
    },
    searchFood: function(value){
        this.init();
        this.app.searchFood(value);
    },
    seachfoodRecordByDate:function(date){
        this.init();
        $(".days li").each(function(index,item){
            if(date===$(item).data("day")){
                $(item).addClass("cur");
            }else{
                $(item).removeClass("cur");
            }
        });
        this.app.foodRecordSearch(date);
    },
    seachfoodDetail:function(id){
        this.init();
        this.app.foodDetail(id);
    }
});
$(document).ready(function () {
    //init day choose

    root.localStorage=localStorage;
    
    app.router = new myRouter();
    Backbone.history.start();
})