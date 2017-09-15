 var app=app||{};
 app.foodRecordList = Backbone.Collection.extend({
    // Will hold objects of the Service model
    model:  app.foodRecord,
    url:"",
    initialize: function(){
 		var foodRecordIds=root.localStorage.getItem('foodRecord'),tmp=[],_this=this;
		if(foodRecordIds!=null){
		  foodRecordIds.split(",").forEach(function(id){
		      var data=root.localStorage.getItem('foodRecord-'+id);
		      if(data!==null){
		        tmp.push(JSON.parse(data));
		      }
		  });
		  _this.push(tmp);
		}
    },
    getItemsByDate:function(date){
    	var tmp=this.where({date: date});
    	var totalcal=tmp.reduce(function(p,c){
    		return p+c.get("quanity")*c.get("food").nutrient_value;
    	},0);
    	return {
    		foods:tmp,
    		total:totalcal
    	};
    }
});