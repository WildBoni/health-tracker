// Tutorial on how to use Require.js
// http://kilon.org/blog/2012/08/build-backbone-apps-using-requirejs/
require.config({
  baseUrl: "js",
  paths: {
    'jquery': 'libraries/jquery',
    'underscore': 'libraries/underscore',
    'backbone': 'libraries/backbone',
    'backbone.localStorage': 'libraries/backbone.localStorage'
  },
  shim: {
    'underscore': {
      exports: "_"
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.localStorage': {
      deps: ['backbone'],
      exports: 'BackboneLocSt'
    }
  }
});

require([
    'backbone',
    'router',
    'views/mealApp',
    'views/mealSearch'
  ], function(Backbone, AppRouter, MealApp, MealSearch) {

    // useful Backbone tutorials:
    // http://adrianmejia.com/blog/2012/09/11/backbone-dot-js-for-absolute-beginners-getting-started/
    // http://tutorialzine.com/2013/04/services-chooser-backbone-js/
      new AppRouter();

      new MealApp();
      var search = new MealSearch();
      $('#main').html(search.render().el);
      Backbone.history.start();

  });
