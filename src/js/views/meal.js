define(['underscore', 'backbone', 'backbone.localStorage', 'collections/SavedMealsList'], function(_, Backbone, BackboneLocSt, SavedMealsList) {
  var MealView = Backbone.View.extend({

    tagName: 'li',

    events: {
      "click .add": "add"
    },

    initialize: function(options) {
      if (options.model)
      this.model = options.model;
    },

    render: function() {
      // displaying meal name + calories amount and attaching an add button
      this.$el.html(this.model.attributes.fields.item_name+
        " ("+this.model.attributes.fields.nf_calories+" calories )"+
        " <button class='add'>ADD</button>");
      return this;
    },

    add: function(){
      SavedMealsList.create({
        title: this.model.attributes.fields.item_name,
        calories: parseInt(this.model.attributes.fields.nf_calories)
      });
    }

  });

  return MealView;
});
