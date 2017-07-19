var app=app||{};
app.mainView = Backbone.View.extend({
      el: $('#main'),
      initialize: function(){
          var _this=this;
          _this.searchInput=$("#searchText");
          _this.list=$("#services");
          _this.date=$("input[name='date_submit']");
          _this.foods=new app.foodList();
          _this.foodRecords=new app.foodRecordList();
          _this.listenTo( _this.foods, 'reset', _this.searchFoodRender );
          Backbone.on('addFoodRecord', this.addFoodRecord, this);
          Backbone.on('removeFoodRecord', this.removeFoodRecord, this);
      },
      events: {
        "click #search" : "directSearch",
        "click #searchByDate" : "directFoodRecordSearch"
      },
      directSearch:function(){
        app.router.navigate("search/"+this.searchInput.val(), {trigger: true});
      },
      directFoodRecordSearch:function(){
        app.router.navigate("foodRecordDate/"+this.date.val(), {trigger: true});
      },
      searchFood:function(value){
        var _this=this;
        _this.foods.getItems(value);
      },
      searchFoodRender:function(value){
        var _this=this;
        var fragment= $(document.createDocumentFragment());
        _this.foods.forEach(function(food){
            var view = new app.foodView({ model: food});
            fragment.append(view.render().el);
        });
        _this.render(fragment);
      },
      foodDetail:function(id){
         var view = new app.foodView({ model: new app.food({"resource_id":id})});
         view.fetchDetail();
      },
      foodRecord:function(){
          var _this=this;
          var fragment= $(document.createDocumentFragment());
          _this.foodRecords.forEach(function(food){
              var view = new app.foodRecordView({ model: food});
              fragment.append(view.render().el);
          });
          _this.render(fragment);
      },
      foodRecordSearch:function(date){
        var _this=this;
        var tmp=_this.foodRecords.getItemsByDate(date);
        console.log(tmp);
        var fragment= $(document.createDocumentFragment());
        tmp.forEach(function(food){
            var view = new app.foodRecordView({ model: food});
            fragment.append(view.render().el);
        });
        _this.render(fragment);
      },
      render: function(fragment){
          this.list.empty();
          this.list.append(fragment);
          return this;
     	},
      addFoodRecord:function(data){
        var _this=this;
        var food=new app.foodRecord(data);
        food.save({dataType:'json'}, {
            success: function (model, respose, options) {
                console.log("The model has been saved to the server");
            },
            error: function (model, xhr, options) {
                console.log("Something went wrong while saving the model");
            }
        });
        _this.foodRecords.push(food);
      },
      removeFoodRecord:function(model){
        model.destroy();
        console.log(this.foodRecords)
      }
  });