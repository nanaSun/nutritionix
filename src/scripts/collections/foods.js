 var foodList = Backbone.Collection.extend({
    // Will hold objects of the Service model
    model: food,

    // Return an array only with the checked services
    getChecked: function(){
        return this.where({checked:true});
    }
});