// useful Backbone tutorials:
// http://adrianmejia.com/blog/2012/09/11/backbone-dot-js-for-absolute-beginners-getting-started/
// http://tutorialzine.com/2013/04/services-chooser-backbone-js/

var searchMeal = 'pasta';
var applicationId = 'cce231b3';
var applicationKey = 'b19085c7c7974513d3dd5df7073852d5';

$(function() {
/*  var Meal = Backbone.Model.extend({
    defaults:{
      title: 'meal type',
      calories: 100,
      selected: false
    },

    toggle: function() {
      this.set('selected', !this.get('selected'));
    }
  });
*/
  // api blog post
  // http://blog.cloudoki.com/backbone-app-end-to-end-connecting-to-an-external-api/
  // Populayting collection with Nutritionix APIs is exlained here:
  // http://stackoverflow.com/questions/32143288/backbone-js-populating-my-collection-and-then-appending-it-to-the-page
  var MealList = Backbone.Collection.extend({
    /*model: Meal,
    getSelected: function() {
      return this.where({selected: true});
    }*/
    url: "https://api.nutritionix.com/v1_1/search/"+ searchMeal +
    "?results=0%3A20&cal_min=0&cal_max=50000" +
    "&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=" +
    applicationId +"&appKey=" + applicationKey,

    initialize: function(){
    },

    //** 1. Function "parse" is a Backbone function to parse the response properly
    parse:function(response){
      //** return the array inside response, when returning the array
      //** we left to Backone populate this collection
      return response.hits;
    }
  });

/*  var meals = new MealList([
    // this array needs to be retrieved using Nutritionix APIs
    new Meal({ title: 'pizza', calories: 450}),
		new Meal({ title: 'pasta', calories: 250}),
		new Meal({ title: 'hot dog', calories: 350}),
		new Meal({ title: 'hamburger', calories: 500})
  ]);*/

  /*var MealView = Backbone.View.extend({
    tagName: 'li',
    events:{
      'click': 'toggleMeal'
    },

    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
    },

    render: function(){
      this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('title') +
        '" /> ' + this.model.get('title') + '<span>' + this.model.get('calories') + '</span>');
        this.$('input').prop('selected', this.model.get('selected'));
        return this;
    },

    toggleMeal: function(){
      this.model.toggle();
    }
  });*/

  var App = Backbone.View.extend({
    el: $('#main'),

    initialize: function(){
    /*  this.total = $('#total span');
      this.list = $('#meals');
      this.listenTo(meals, 'change', this.render);
      meals.each(function(meal) {
        var view = new MealView({ model: meal });
        this.list.append(view.render().el);
      }, this);*/

      //** 2. the view must listen to an object inside in the view
      //** so we create a new instance of MealList and save it into model var of the view
      this.model = new MealList();
      this.model.fetch();
      this.listenTo(this.model, 'sync', this.render);
      // Cache these selectors
      // this.total = $('#total span');
      this.list = $('#meals');
    },

    render: function(){
      /*var total = 0;
      _.each(meals.getSelected(), function(elem) {
        total += elem.get('calories');
      });
      this.total.text(total);
      return this;*/
      //** 2. Continue
      var terms = this.model;
      // Calculate the total order amount by agregating
      // the prices of only the checked elements
      terms.each(function(term){
          this.list.append("<li>"+ term.get('fields').item_name+"</li>");
      }, this);
    }
  });
  new App();
});

/*var searchMeal = 'pasta';
var applicationId = 'cce231b3';
var applicationKey = 'b19085c7c7974513d3dd5df7073852d5';
var nutritionixRequest = 'https://api.nutritionix.com/v1_1/search/'+ searchMeal +
  '?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=' +
  applicationId +'&appKey=' + applicationKey;*/
