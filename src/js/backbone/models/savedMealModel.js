var SavedMeal = Backbone.Model.extend({
  defaults: function() {
    return {
      title: 'new saved meal',
      calories: 0,
      order: SavedMeals.nextOrder()
    };
  }
});
