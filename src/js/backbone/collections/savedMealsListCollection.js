var SavedMealsList = Backbone.Collection.extend({
  model: SavedMeal,
  localStorage: new Backbone.LocalStorage('savedmeals-backbone'),
  nextOrder: function() {
    if(!this.length) return 1;
    return this.last().get('order') + 1;
  },
  comparator: 'order',

  // using reduce()
  // http://stackoverflow.com/questions/7722048/getting-the-sum-of-a-collection-all-models-with-backbone-js
  caloriesTotal: function() {
    return this.reduce(function(memo, value) {
      return memo + value.get("calories");
    }, 0);
  }
});
