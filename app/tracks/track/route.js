import Ember from 'ember';

const {getOwner} = Ember;

export default Ember.Route.extend({
  selections: Ember.inject.service(),
  model(params) {
    return this.store.peekRecord('track', params.track_id);
  },

  afterModel(model) {
    // set track in track selector when we go directly to this route
    this.set('selections.selectedTrack', model);
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
