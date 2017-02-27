import Ember from 'ember';

export default Ember.Component.extend({
  selectedTrack: null,
  actions: {
    chooseTrack(track) {
      this.set('selectedTrack', track);
      this.get('attrs').action(track);
    }
  }
});
