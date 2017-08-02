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
          _this.readyToAddId="";
          _this.addDiet=$("#addDiet");
          _this.addDietBtn=$("#addDiet .add");
          _this.foods=new app.foodList();
          _this.searchResults=new app.searchList();
          _this.foodRecords=new app.foodRecordList();
          _this.loading=$(".loading");
          _this.listenTo( _this.foods, 'reset', _this.searchFoodRender );
          _this.listenTo( _this.searchResults, 'reset', _this.searchResultsRender );
          Backbone.on('editFood', this.editFood, this);
          Backbone.on('removeFoodRecord', this.removeFoodRecord, this);
          _this.searchBtn.bind("click",function(){
            _this.searchResults.abortSearch();
            if(Backbone.history.fragment=="search/"+_this.searchInput.val()){
                Backbone.history.loadUrl();
            }else{
                app.router.navigate("search/"+_this.searchInput.val(),{trigger: true, replace: true});
            }
            
          });
          _this.quanity.bind("blur",function(){
            $(".searchList").addClass("hide");
            var q=parseInt($(this).val()),tmp=[];
            if(q>0&&_this.readyToAddId!==""){
                tmp=_this.foods.searchID(_this.readyToAddId);
                tmp=tmp.length==1?tmp[0]:[];
                tmp.set("num",q); 
            }
          });
          _this.addDietBtn.bind("click",function(){

             var q=parseInt(_this.quanity.val()),tmp=[];
              if(q>0&&_this.readyToAddId!==""){
                  tmp=_this.foods.searchID(_this.readyToAddId);
                  tmp=tmp.length==1?tmp[0]:[];
                  _this.addFoodRecord(tmp,function(){
                     _this.addDiet.addClass("hide");
                  });    
              }
          });
          _this.searchInput.bind("keyup",function(){
              var value=$(this).val();
              $(".searchList").addClass("hide");
              if(value!==""){
                _this.searchResults.getItems(value,function(){
                  _this.searchResultsRender([]);
                  console.log("error")
                });            
              }
              
          })
          _this.loading.addClass("hide");

      },
      searchResultsRender:function(value){
          var _this=this;
          var fragment= $(document.createDocumentFragment());
          if(value.length>0){
            _this.searchResults.forEach(function(r){
                console.log(r);
                var view = new app.searchView({ model: r});
                fragment.append(view.render().el);
            });
            $(".searchList").html(fragment).removeClass("hide");
          }
          
      },
      searchFood:function(value){
        var _this=this;
        if(value!==""){
          _this.loading.removeClass("hide").addClass("processing")
          _this.foods.getItems(value,function(){
             _this.searchFoodRender([]);
          });
        }
      },
      searchFoodRender:function(value){
        var _this=this;
        var fragment= $(document.createDocumentFragment());
        if(value.length>0){
          _this.foods.forEach(function(food){
              var view = new app.foodView({ model: food});
              fragment.append(view.render().el);
          });
        }else{
          fragment.append("<li>Something wrong</li>");
        }
        _this.render(fragment);
        _this.loading.addClass("hide").removeClass("processing");
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
      editFood:function(id){
          this.readyToAddId=id;
          console.log(this.readyToAddId)
      },
      addFoodRecord:function(data,callback){
        console.log(data);
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
                callback();
            },
            error: function (model, xhr, options) {
                console.log("Something went wrong while saving the model");
            }
        });
        _this.foodRecords.push(food);
      },
      removeFoodRecord:function(model){
        console.log(model);
        model.destroy();
      }
  });