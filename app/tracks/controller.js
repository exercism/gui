import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    showTrack(track) {
      this.transitionToRoute('tracks.track', track);
    }
  }
});
