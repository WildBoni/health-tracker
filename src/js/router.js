define(['underscore', 'backbone', 'backbone.localStorage'], function(_, Backbone, BackboneLocSt) {
  // Router built following this tutorial
  // https://cdnjs.com/libraries/backbone.js/tutorials/what-is-a-router
  // And these expamples
  // https://github.com/ryanricard/backbone-routes-example
  var AppRouter = Backbone.Router.extend({
    routes: {
      "": "newmeal",
      "newmeal": "newmeal",
      "mymeal": "mymeal"
    },

    deselect: function() {
      $('ul#menu li').removeClass('uk-active');
    },

    select: function(voice) {
      this.deselect();
      $(voice).addClass('uk-active');
    },

    hide: function() {
      $('div.pages').hide();
    },

    show: function(page) {
      this.hide();
      $(page).show();
    },

    newmeal: function() {
      this.show('div#main');
      this.select('li.newmeal');
    },

    mymeal: function() {
      this.show('div#saved-meals-list');
      this.select('li.mymeals');
    }
  });

  return AppRouter;
});
