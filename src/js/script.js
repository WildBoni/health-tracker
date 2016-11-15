// useful Backbone tutorials: 
// http://adrianmejia.com/blog/2012/09/11/backbone-dot-js-for-absolute-beginners-getting-started/
// http://tutorialzine.com/2013/04/services-chooser-backbone-js/
$(function() {
  var Meal = Backbone.Model.extend({
    defaults:{
      title: 'meal type',
      calories: 'meal calories',
      selected: false
    },

    toggle: function() {
      this.set('selected', !this.get('selected'));
    }
  });
});
