import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('track');
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('selectedTrack', null);
  }
});
