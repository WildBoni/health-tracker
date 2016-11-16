// useful Backbone tutorials:
// http://adrianmejia.com/blog/2012/09/11/backbone-dot-js-for-absolute-beginners-getting-started/
// http://tutorialzine.com/2013/04/services-chooser-backbone-js/

var applicationId = 'cce231b3';
var applicationKey = 'b19085c7c7974513d3dd5df7073852d5';

$(function() {
  var Meal = Backbone.Model.extend({
    initialize: function(options) {}
  });
  // api blog post
  // http://blog.cloudoki.com/backbone-app-end-to-end-connecting-to-an-external-api/
  // Populayting collection with Nutritionix APIs is explained here:
  // http://stackoverflow.com/questions/32143288/backbone-js-populating-my-collection-and-then-appending-it-to-the-page
  var MealList = Backbone.Collection.extend({
    initialize: function(options) {
      if (options.mealType)
        this.mealType = options.mealType;
    },

    url: function() {
      return "https://api.nutritionix.com/v1_1/search/"+ this.mealType +
        "?results=0%3A50&cal_min=0&cal_max=50000" +
        "&fields=item_name%2Cbrand_name%2Cnf_calories%2Citem_id%2Cbrand_id&appId=" +
        applicationId +"&appKey=" + applicationKey;
    },
    //** 1. Function "parse" is a Backbone function to parse the response properly
    parse: function(response) {
      console.log(this.url);

      //** return the array inside response, when returning the array
      //** we left to Backone populate this collection
      return response.hits;
    }
  });

  var FoodSearch = Backbone.View.extend({
    events: {
      "click button": "fetchData"
    },

    template: "<input type='text' placeholder='search'>" +
               "<button>Search food</button>" +
               "<ul id='food-list'></ul>",

    initialize: function(options) {

    },

    render: function() {
      this.$el.html(this.template);
      return this;
    },

    fetchData: function(data) {
      var searchMeal = this.$el.find('input').val();
      var foods = new MealList({mealType: searchMeal});
      foods.fetch({success: this.renderfood.bind(this)});
    },

    renderfood: function(food) {
      var foodview;
      for (var n in food.models) {
        foodview = new FoodView({model: food.models[n]});
        this.$el.find('#food-list').append(foodview.render().el);
      }
    }
  });

  var FoodView = Backbone.View.extend({
    tagName: 'li',

    initialize: function(options) {
      if (options.model)
      this.model = options.model;
      console.log(this.model);
    },

    render: function() {

      this.$el.html(this.model.attributes.fields.item_name+" ("+this.model.attributes.fields.nf_calories+" calories )");
      return this;
    }
  });

var search = new FoodSearch();
$('#main').html(search.render().el);
});
