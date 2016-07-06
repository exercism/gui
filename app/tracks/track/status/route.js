import Ember from 'ember';

export default Ember.Route.extend({
  exercism: Ember.inject.service(),

  model() {
    let trackId = this.paramsFor('tracks.track').track_id;
    return this.store.findRecord('status', trackId);
  },

  actions: {
    refreshModel() {
      this.refresh();
    }
  }

});
