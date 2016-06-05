import Ember from 'ember';

export default Ember.Controller.extend({
  selectedTrack: null,
  actions: {
    showTrack(track) {
      this.set('selectedTrack', track);
      this.transitionToRoute('tracks.track', track);
    }
  }
});
