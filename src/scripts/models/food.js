 var app=app||{};
 app.food = Backbone.Model.extend({
    defaults:{
        brand_name:"",
		item_name:"",
		nutrient_name:"",
		nutrient_uom:"",
		nutrient_value:"",
		nutrients:"",
		resource_id:"",
		serving_qty:"",
		serving_uom:"",
		thumbnail:""
    },
    url:"http://localhost:8888/?action=i&q="
});