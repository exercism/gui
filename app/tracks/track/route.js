import Ember from 'ember';

const {getOwner} = Ember;
const electron = requireNode('electron');
const path = requireNode('path');

export default Ember.Route.extend({
  configuration: Ember.inject.service(),
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
      Ember.Logger.info('Refreshing route', currentRoute);
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
    },

    openTrackFolder() {
      let dir = this.get('configuration.dir'),
          selectedTrack = this.get('selections.selectedTrack.slug'),
          fullPath = path.join(dir, selectedTrack);

      electron.shell.openItem(fullPath);
    }

  }
});
