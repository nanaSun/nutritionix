var app=app||{};
/**
* @description main view of the website
* @constructor
*/
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
          _this.totalCal=$("#totalCal span");
          _this.listenTo( _this.foods, 'reset', _this.searchFoodRender );
          _this.listenTo( _this.searchResults, 'reset', _this.searchResultsRender );

          // bind some triggers
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
          _this.quanity.bind("blur", function() {
            var tmp=_this.foods.searchID(_this.readyToAddId);
            tmp=tmp.length==1?tmp[0]:[];
            $("#detail .ttlqty").html($(this).val()*tmp.get("serving_qty"));
            $("#detail .cal").html($(this).val()*tmp.get("nutrient_value"));
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
                });            
              }
              
          });
          _this.loading.addClass("hide");
      },
      /**
      * @description After autocomplete api return render the searchresults 
      * @param {array} value - the results
      */
      searchResultsRender:function(value){
          var _this=this;
          var fragment= $(document.createDocumentFragment());
          if(value.length>0){
            _this.searchResults.forEach(function(r){
                var view = new app.searchView({ model: r});
                fragment.append(view.render().el);
            });
            $(".searchList").html(fragment).removeClass("hide");
          }
          
      },
      /**
      * @description when start requesting food api
      * @param {string} value - the word to search
      */
      searchFood:function(value){
        var _this=this;
        if(value!==""){
          _this.loading.removeClass("hide").addClass("processing");
          _this.foods.getItems(value,function(){
             _this.searchFoodRender([]);
          });
        }
      },
      /**
      * @description after food api return results and then render the list 
      * @param {array} value - the return results
      */
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
      /**
      * @description when food record change refresh the dom
      */
      foodRecord:function(){
          var _this=this;
          var fragment= $(document.createDocumentFragment());
          _this.foodRecords.forEach(function(food){
              var view = new app.foodRecordView({ model: food});
              fragment.append(view.render().el);
          });
          _this.render(fragment);
      },
      /**
      * @description search food record by date
      * @param {string} date - the day string
      */
      foodRecordSearch:function(date){
        var _this=this;
        var tmp=_this.foodRecords.getItemsByDate(date);
        var fragment= $(document.createDocumentFragment());
        _this.totalCal.html(tmp.total);
        tmp.foods.forEach(function(food){
            var view = new app.foodRecordView({ model: food});
            fragment.append(view.render().el);
        });
        _this.render(fragment);
      },
      /**
      * @description render the dom who's class is list 
      */
      render: function(fragment){
          this.list.append(fragment);
          return this;
     	},
      /**
      * @description make the edit id become visitable
      * @param {string} id - the food id
      */
      editFood:function(id){
          this.readyToAddId=id;
      },
      /**
      * @description add food record to the storage
      * @param {object} data - food array
      * @param {function} callback - after function
      */
      addFoodRecord:function(data,callback){
        var _this=this;
        var food=new app.foodRecord({
          date:_this.date.val(),
          period:_this.period.val(),
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
      /**
      * @description delete food record from the storage
      * @param {object} model - the record object to delete
      */
      removeFoodRecord:function(model){
        model.destroy();
      }
  });