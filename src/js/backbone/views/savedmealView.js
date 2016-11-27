// A good post for Backbone noobs like me!
// http://codebyexample.info/2012/03/06/backbone-baby-steps/
var SavedMealView = Backbone.View.extend({

  tagName: 'li',
  template: _.template($('#item-template').html()),
  events: {
    'click button.destroy' : 'clear'
  },
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  clear: function() {
    this.model.destroy();
  }
});
