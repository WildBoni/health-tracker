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
    // preparing basic elements: a texbox, a button and a list container
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

  var SavedMeal = Backbone.Model.extend({
    defaults: function() {
      return {
        title: 'new saved meal',
        calories: '0',
        order: SavedMeals.nextOrder()
      };
    }
  });

  var SavedMealsList = Backbone.Collection.extend({
    model: SavedMeal,
    localStorage: new Backbone.LocalStorage('savedmeals-backbone'),
    nextOrder: function() {
      if(!this.length) return 1;
      return this.last().get('order') + 1;
    },
    comparator: 'order'
  });

  var SavedMeals = new SavedMealsList();

  // A good post for Backbone noobs like me!
  // http://codebyexample.info/2012/03/06/backbone-baby-steps/
  var SavedMealView = Backbone.View.extend({
    el: $('#saved-meal'),
    template: _.template($('#item-template').html()),
    events: {
      'click button.destroy' : 'clear'
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    clear: function() {
      this.model.destroy();
    }
  });

  var MealView = Backbone.View.extend({

    tagName: 'li',

    events: {
      "click .add": "add"
    },

    initialize: function(options) {
      if (options.model)
      this.model = options.model;
      //console.log(this.model);
    },

    render: function() {
      // displaying meal name + calories amount and attaching an add button
      this.$el.html(this.model.attributes.fields.item_name+
        " ("+this.model.attributes.fields.nf_calories+" calories )"+
        " <button class='add'>ADD</button>");
      return this;
    },

    add: function(){
      SavedMeals.create({
        title: this.model.attributes.fields.item_name,
        calories: this.model.attributes.fields.nf_calories
      });
      console.log(this.model.attributes.fields.item_name + this.model.attributes.fields.nf_calories);
    }

  });

  var MealApp = Backbone.View.extend({
    el: $("#saved-meals-list"),

    initialize: function() {
      this.listenTo(SavedMeals, 'add', this.addOne);
      this.listenTo(SavedMeals, 'reset', this.addAll);
      this.listenTo(SavedMeals, 'all', this.render);
      SavedMeals.fetch(
        {success: this.rendermeal.bind(this)}
      );
    },

    rendermeal: function(meal) {
      var savedmealview;
      // clearing the list before updating it with new data
      // thanks to andrewR and its suggestion in this thread
      // https://discussions.udacity.com/t/cannot-delete-old-results-when-a-new-search-item-is-submitted/199056/4
      for (var n in meal.models) {
        savedmealview = new SavedMealView({model: meal.models[n]});
        console.log(meal.models[n]);
        this.$el.find('#saved-meals-list').append(savedmealview.render().el);
      }
    },

    render: function() {

    },

    addOne: function(selectedMeal) {
      var view = new SavedMealView({model: selectedMeal});
      this.$el.find('#saved-meals-list').append(view.render().el);
      console.log(this.$el.find('#saved-meals-list').append(view.render().el));
    },

    addAll: function() {
      SavedMeals.each(this.addOne, this);
    },
  });

  var search = new MealSearch();
  var app = new MealApp;
  $('#main').html(search.render().el);
});
