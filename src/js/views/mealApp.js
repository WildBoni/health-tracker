define(['underscore', 'backbone', 'backbone.localStorage', 'router', 'views/totalCalories',  'collections/SavedMealsList',  'views/SavedMealView'], function(_, Backbone, BackboneLocSt, AppRouter, TotalCalories, SavedMealsList, SavedMealView) {
  var MealApp = Backbone.View.extend({
    el: $("body"),

    initialize: function() {
      this.router = new AppRouter();
      var totalCalories = new TotalCalories();

      this.listenTo(SavedMealsList, 'add', this.addOne);
      this.listenTo(SavedMealsList, 'reset', this.addAll);
      this.listenTo(SavedMealsList, 'all', this.render);
      SavedMealsList.fetch();
    },

    events: {
      'click ul#menu li.newmeal a': 'displayNewMeals',
      'click ul#menu li.mymeals a': 'displayMyMeals'
    },

    render: function() {
    },

    displayNewMeals: function() {
      this.router.navigate("newmeal", true);
    },

    displayMyMeals: function() {
      this.router.navigate("mymeal", true);
    },

    addOne: function(selectedMeal) {
      var view = new SavedMealView({model: selectedMeal});
      this.$('#saved-meals').append(view.render().el);
    },

    addAll: function() {
      SavedMealsList.each(this.addOne, this);
    },
  });

  return MealApp;
});
