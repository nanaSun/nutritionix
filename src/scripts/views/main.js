var app=app||{};
app.mainView = Backbone.View.extend({
      el: $('#main'),
      initialize: function(){
          var _this=this;
           this.searchInput=$("#searchText");
            this.list=$("#services");
          _this.foods=new app.foodList([]);
          _this.foodRecords=new app.foodRecordList([]);
          _this.listenTo( _this.foods, 'reset', _this.render );
          Backbone.on('addFoodRecord', this.addFoodRecord, this);
      },
      events: {
        "click #search" : "directSearch"
      },
      directSearch:function(){
         app.router.navigate("search/"+this.searchInput.val(), {trigger: true});
      },
      foodRecord:function(){
          var _this=this;
          var fragment= $(document.createDocumentFragment());
          var foodRecordIds=root.localStorage.getItem('foodRecord');
          if(foodRecordIds!=null){
              foodRecordIds.split(",").forEach(function(id){
                  var data=root.localStorage.getItem('foodRecord-'+id);
                  if(data!==null){
                    var food=new app.foodRecord(JSON.parse(data));
                    _this.foodRecords.push(food);
                    var view = new app.foodRecordView({ model: food});
                    fragment.append(view.render().el);
                  }
              });
              this.list.append(fragment);
          }
      },
      render: function(){
          var fragment= $(document.createDocumentFragment());
          this.list.empty();
          this.foods.each(function(food){
              var view = new app.foodView({ model: food});
              fragment.append(view.render().el);
          }, this); 
         
          this.list.append(fragment);
          return this;
     	},
     	searchFood:function(value){
        var _=this;
     		this.foods.getItems(value);
     	},
      addFoodRecord:function(data){
        console.log(data);
        var _this=this;
        var food=new app.foodRecord(data);
        _this.foodRecords.push(food);
      }
  });