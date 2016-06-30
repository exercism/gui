import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('track');
  },

  actions: {
    showTrack(track) {
      this.transitionTo('tracks.track', track);
    }
  }
});
