import Ember from 'ember';

export default Ember.Route.extend({
  selections: Ember.inject.service(),
  model() {
    return this.store.findAll('track');
  },

  redirect() {
    let track = this.get('selections.selectedTrack');
    if (track) {
      this.transitionTo('tracks.track', track);
    }
  },

  actions: {
    showTrack(track) {
      this.transitionTo('tracks.track', track);
    }
  }
});
