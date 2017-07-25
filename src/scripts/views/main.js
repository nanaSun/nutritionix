var app=app||{};
app.mainView = Backbone.View.extend({
      el: $('#main'),
      initialize: function(){
          var _this=this;
          _this.searchInput=$("#searchText");
          _this.searchBtn=$(".serachDiv a");
          _this.list=$("#services");
          _this.date=$("input[name='date_submit']");
          _this.quanity=$("#quanity");
          
          _this.period=$("#period");
          _this.foods=new app.foodList();
          _this.foodRecords=new app.foodRecordList();
          _this.listenTo( _this.foods, 'reset', _this.searchFoodRender );
          Backbone.on('addFoodRecord', this.addFoodRecord, this);
          Backbone.on('removeFoodRecord', this.removeFoodRecord, this);
          _this.searchBtn.bind("click",function(){
            app.router.navigate("search/"+_this.searchInput.val(), {trigger: true});
          })
      },
      searchFood:function(value){
        var _this=this;
        if(value!==""){
          _this.foods.getItems(value);
        }
        
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
        var fragment= $(document.createDocumentFragment());
        tmp.forEach(function(food){
            var view = new app.foodRecordView({ model: food});
            fragment.append(view.render().el);
        });
        _this.render(fragment);
      },
      render: function(fragment){
          this.list.append(fragment);
          return this;
     	},
      addFoodRecord:function(data){
        var _this=this;
        var food=new app.foodRecord({
          date:_this.date.val(),
          period:_this.quanity.val(),
          quanity:_this.quanity.val(),
          food:data
        });
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