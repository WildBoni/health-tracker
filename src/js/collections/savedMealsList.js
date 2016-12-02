define(['underscore', 'backbone', 'backbone.localStorage', 'models/savedMeal'], function(_, Backbone, BackboneLocSt, SavedMeal) {
  var SavedMealsList = Backbone.Collection.extend({
    model: SavedMeal,
    localStorage: new Backbone.LocalStorage('savedmeals-backbone'),

    // using reduce()
    // http://stackoverflow.com/questions/7722048/getting-the-sum-of-a-collection-all-models-with-backbone-js
    caloriesTotal: function() {
      return this.reduce(function(memo, value) {
        return memo + value.get("calories");
      }, 0);
    }
  });

  return new SavedMealsList();
});
