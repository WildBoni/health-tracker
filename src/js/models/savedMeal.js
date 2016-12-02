define(['underscore', 'backbone', 'backbone.localStorage', 'collections/savedMealsList'], function(_, Backbone, BackboneLocSt,SavedMealsList) {
  var SavedMeal = Backbone.Model.extend({
    defaults: function() {
      return {
        title: 'new saved meal',
        calories: 0
      };
    }
  });

  return SavedMeal;

});
