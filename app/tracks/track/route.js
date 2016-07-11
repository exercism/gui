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

  refreshOrTransition(){
    let [route, ...args] = arguments;
    let currentRoute = getOwner(this).lookup('controller:application').currentRouteName;
    if (currentRoute === route || currentRoute === `${route}.index`) {
      window.console.info('Refreshing route', currentRoute);
      this.send('refreshModel');
    } else {
      this.transitionTo(route, ...args);
    }
  },

  actions: {
    fetch() {
      this.refreshOrTransition('tracks.track.fetch');
    },

    fetchAll() {
      this.refreshOrTransition('tracks.track.fetch-all');
    },

    status(trackId) {
      this.refreshOrTransition('tracks.track.status', trackId);
    },

    restore() {
      this.refreshOrTransition('tracks.track.restore');
    }

  }
});
