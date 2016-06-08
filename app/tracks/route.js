import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('track');
  },

  actions: {
    willTransition() {
      this.controller.set('selectedTrack', null);
      return true;
    }
  }
});
