import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('track');
  },

  redirect() {
    if (this.controller) {
      let track = this.controller.get('selectedTrack');
      if (track) {
        this.transitionTo('tracks.track', track);
      }
    }
  },

  actions: {
    showTrack(track) {
      this.transitionTo('tracks.track', track);
    }
  }
});
