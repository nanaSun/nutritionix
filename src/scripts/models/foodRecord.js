var app=app||{};
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
app.LocalStorage=Backbone.LocalStorage;
root.localStorage=localStorage;

app.foodRecord = Backbone.Model.extend({
    defaults:{
        date:app.date,
		food:""
    },
    localStorage:new app.LocalStorage('foodRecord'),
    initialize: function(){
        if(this.get("food")!==""){
            this.save();
            this.set("food",JSON.parse(this.get("food")));
        }
    },
    changeToDate:function(){
    	this.fetch({

    	});
    }
});
