import Ember from 'ember';

const {getOwner} = Ember;

export default Ember.Route.extend({
  model(params) {
    return this.store.peekRecord('track', params.track_id);
  },
  actions: {
    fetch() {
      let currentRoute = getOwner(this).lookup('controller:application').currentRouteName;
      if (currentRoute === 'tracks.track.fetch') {
        this.send('reloadFetch');
      } else {
        this.transitionTo('tracks.track.fetch');
      }
    }
  }
});
