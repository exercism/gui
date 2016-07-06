import Ember from 'ember';

export default Ember.Route.extend({
  exercism: Ember.inject.service(),

  model() {
    let trackId = this.paramsFor('tracks.track').track_id;
    return this.store.query('problem', { track_id: trackId }).then((problems) => {
      return this.get('exercism').saveProblems(problems);
    });
  },

  actions: {
    refreshModel() {
      this.refresh();
    }
  }

});
