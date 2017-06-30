 var app=app||{};

 app.foodRecordList = Backbone.Collection.extend({
    // Will hold objects of the Service model
    model:  app.foodRecord,
    url:""
});