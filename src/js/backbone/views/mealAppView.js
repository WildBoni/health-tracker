var MealApp = Backbone.View.extend({
  el: $("body"),

  initialize: function() {
    this.router = new AppRouter();
    var totalCalories = new TotalCalories();
    Backbone.history.start();
    this.listenTo(SavedMeals, 'add', this.addOne);
    this.listenTo(SavedMeals, 'reset', this.addAll);
    this.listenTo(SavedMeals, 'all', this.render);
    SavedMeals.fetch();
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
    SavedMeals.each(this.addOne, this);
  },
});
