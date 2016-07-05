import Ember from 'ember';

export default Ember.Route.extend({
  exercism: Ember.inject.service(),

  model() {
    let trackId = this.paramsFor('tracks.track').track_id;
    return this.get('exercism').getStatus(trackId);
  },

  actions: {
    refreshModel() {
      this.refresh();
    }
  }

});
