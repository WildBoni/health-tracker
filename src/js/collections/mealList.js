define(['underscore', 'backbone', 'backbone.localStorage'], function(_, Backbone, BackboneLocSt) {
  // Nutritionix APIs personal keys
  var applicationId = 'cce231b3';
  var applicationKey = 'b19085c7c7974513d3dd5df7073852d5';
  // api blog post
  // http://blog.cloudoki.com/backbone-app-end-to-end-connecting-to-an-external-api/
  // Populating collection with Nutritionix APIs is explained here:
  // http://stackoverflow.com/questions/32143288/backbone-js-populating-my-collection-and-then-appending-it-to-the-page
  var MealList = Backbone.Collection.extend({
    initialize: function(options) {
      if (options.mealType)
        this.mealType = options.mealType;
    },

    url: function() {
      return "https://api.nutritionix.com/v1_1/search/"+ this.mealType +
        "?results=0%3A50&cal_min=0&cal_max=50000" +
        "&fields=item_name%2Cbrand_name%2Cnf_calories%2Citem_id%2Cbrand_id&appId=" +
        applicationId +"&appKey=" + applicationKey;
    },

    // parse method return the desired portion of API data
    parse: function(response) {
      // returns array of objects
      return response.hits;
    }
  });
  return MealList;
});
