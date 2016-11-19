// useful Backbone tutorials:
// http://adrianmejia.com/blog/2012/09/11/backbone-dot-js-for-absolute-beginners-getting-started/
// http://tutorialzine.com/2013/04/services-chooser-backbone-js/

var applicationId = 'cce231b3';
var applicationKey = 'b19085c7c7974513d3dd5df7073852d5';

$(function() {
  // not really using this module... Everything goes inside collection
  // as explained in http://backbonejs.org/#API-integration
  var Meal = Backbone.Model.extend({
    initialize: function(options) {}
  });

  // api blog post
  // http://blog.cloudoki.com/backbone-app-end-to-end-connecting-to-an-external-api/
  // Populating collection with Nutritionix APIs is explained here:
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

    // parse method return the desired portion of API data
    parse: function(response) {
      // logs array of objects
      console.log(response.hits);
      return response.hits;
    }
  });

  var MealSearch = Backbone.View.extend({
    events: {
      "click .search": "fetchMeals"
    },
    // preparing basic elelemts: a texbox, a button and a list container
    template: "<input type='text' placeholder='search'>" +
               "<button class='search'>Search meal</button>" +
               "<ul id='meal-list'></ul>",

    initialize: function(options) {
    },

    render: function() {
      this.$el.html(this.template);
      return this;
    },
    // check the input, assign it to a var and insert it into Nutritionix API url
    fetchMeals: function(data) {
      var searchMeal = this.$el.find('input').val();
      var meals = new MealList({mealType: searchMeal});
      // fetch results
      meals.fetch(
        {success: this.rendermeal.bind(this)}
      );
    },
    // assign every result to its MealView
    rendermeal: function(meal) {
      var mealview;
      // clearing the list before updating it with new data
      // thanks to andrewR and its suggestion in this thread
      // https://discussions.udacity.com/t/cannot-delete-old-results-when-a-new-search-item-is-submitted/199056/4
      const _meal_list = this.$el.find('#meal-list');
      _meal_list.html('');
      for (var n in meal.models) {
        mealview = new MealView({model: meal.models[n]});
        // MealView is a <li> that goes inside its <ul>
        this.$el.find('#meal-list').append(mealview.render().el);
      }
    }
  });

  var SavedMeals = Backbone.Collection.extend({
    // TODO: will use local storage for selected meals
  });

  var MealView = Backbone.View.extend({

    tagName: 'li',

    events: {
      "click .add": "add"
    },

    initialize: function(options) {
      if (options.model)
      this.model = options.model;
      console.log(this.model);
    },

    render: function() {
      // displaying meal name + calories amount and attaching an add button
      this.$el.html(this.model.attributes.fields.item_name+
        " ("+this.model.attributes.fields.nf_calories+" calories )"+
        " <button class='add'>ADD</button>");
      return this;
    },

    add: function(retrievedMeal) {
      // TODO: adding selected meal to SavedMeals
    },

  });

  var search = new MealSearch();
  $('#main').html(search.render().el);
  var savedMealss = new SavedMeals();
});
