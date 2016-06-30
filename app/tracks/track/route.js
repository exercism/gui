import Ember from 'ember';

const {getOwner} = Ember;

export default Ember.Route.extend({
  model(params) {
    return this.store.peekRecord('track', params.track_id);
  },

  setupController(controller, model) {
    this._super(...arguments);
    // set track in track selector when we go directly to this route
    this.controllerFor('tracks').set('selectedTrack', model);
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
