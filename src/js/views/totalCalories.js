define(['underscore', 'backbone', 'backbone.localStorage', 'collections/savedMealsList'], function(_, Backbone, BackboneLocSt, SavedMeals) {
  var TotalCalories = Backbone.View.extend({
    el: $("body"),
    initialize: function() {
      this.listenTo(SavedMeals, 'sync remove', this.render);
    },
    render: function() {
      const _total_calories = this.$el.find('#calories');
      _total_calories.html('');
      var totCal = SavedMeals.caloriesTotal();
      this.$('#calories').append(totCal);
    }
  });
  return TotalCalories;
});
