var MealSearch = Backbone.View.extend({
  events: {
    "click .search": "fetchMeals"
  },
  // preparing basic elements: a texbox, a button and a list container
  template: "<input type='text' placeholder='search meal'>" +
             "<button class='search uk-button uk-button-primary'>Search meal</button>" +
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
