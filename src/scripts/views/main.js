var app=app||{};
app.mainView = Backbone.View.extend({
      el: $('#main'),
      events:{
      	"click #search":"searchFood"
      },
      initialize: function(){
          var _this=this;
          _this.searchInput=$("#searchText");
          _this.list=$("#services");
          _this.foods=new app.foodList([]);
          _this.foodRecords=new app.foodRecordList([]);
          _this.listenTo( _this.foods, 'reset', _this.render );
          Backbone.on('addFoodRecord', this.addFoodRecord, this);
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
     	searchFood:function(){
        var _=this;
     		this.foods.getItems(this.searchInput.val());
     	},
      addFoodRecord:function(data){
        console.log(data);
        var _this=this;
        var food=new app.foodRecord(data);
        _this.foodRecords.push(food);
      }
  });