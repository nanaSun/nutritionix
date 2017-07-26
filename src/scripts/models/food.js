 var app=app||{};
 app.food = Backbone.Model.extend({
    defaults:{
        brand_name:"",
		item_name:"",
		nutrient_name:"",
		nutrient_uom:"",
		nutrient_value:0,
		ingredient_statement:"",
		nutrients:"",
		resource_id:"",
		serving_qty:0,
		serving_uom:"",
		thumbnail:"",
		num:0,
		type:"new"
    },
    url:"http://localhost:8888/?action=i&q=",
    initialize: function(){
        this.on('model:num', function(){
        	console.log("num change")
        });
    },
});