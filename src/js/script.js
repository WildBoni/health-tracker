// useful Backbone tutorials:
// http://adrianmejia.com/blog/2012/09/11/backbone-dot-js-for-absolute-beginners-getting-started/
// http://tutorialzine.com/2013/04/services-chooser-backbone-js/
$(function() {
  var Meal = Backbone.Model.extend({
    defaults:{
      title: 'meal type',
      calories: 100,
      selected: false
    },

    toggle: function() {
      this.set('selected', !this.get('selected'));
    }
  });

  var MealList = Backbone.Collection.extend({
    model: Meal,
    getSelected: function() {
      return this.where({selected: true});
    }
  });

  var meals = new MealList([
    // this array needs to be retrieved using Nutritionix APIs
    new Meal({ title: 'pizza', calories: 450}),
		new Meal({ title: 'pasta', calories: 250}),
		new Meal({ title: 'hot dog', calories: 350}),
		new Meal({ title: 'hamburger', calories: 500})
  ]);

  var MealView = Backbone.View.extend({
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
  });

  var App = Backbone.View.extend({
    el: $('#main'),

    initialize: function(){
      this.total = $('#total span');
      this.list = $('#meals');
      this.listenTo(meals, 'change', this.render);
      meals.each(function(meal) {
        var view = new MealView({ model: meal });
        this.list.append(view.render().el);
      }, this);
    },
    
    render: function(){
      var total = 0;
      _.each(meals.getSelected(), function(elem) {
        total += elem.get('calories');
      });
      this.total.text(total);
      return this;
    }
  });
  new App();
});

var searchMeal = 'pasta';
var applicationId = 'cce231b3';
var applicationKey = 'b19085c7c7974513d3dd5df7073852d5';
var nutritionixRequest = 'https://api.nutritionix.com/v1_1/search/'+ searchMeal +
  '?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=' +
  applicationId +'&appKey=' + applicationKey;
