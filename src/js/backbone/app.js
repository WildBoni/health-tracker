// useful Backbone tutorials:
// http://adrianmejia.com/blog/2012/09/11/backbone-dot-js-for-absolute-beginners-getting-started/
// http://tutorialzine.com/2013/04/services-chooser-backbone-js/

var applicationId = 'cce231b3';
var applicationKey = 'b19085c7c7974513d3dd5df7073852d5';

var app_router = new AppRouter;
var SavedMeals = new SavedMealsList;
var app = new MealApp;
var search = new MealSearch();
$('#main').html(search.render().el);
