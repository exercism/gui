import Ember from 'ember';

export default Ember.Route.extend({
  exercism: Ember.inject.service(),

  model() {
    //TODO: this is terribly inefficient
    let track = this.modelFor('tracks.track'),
        trackId = track.get('id'),
        problems = track.get('problems');

    let promises = problems.map((slug) => {
      return this.store.query('problem', { track_id: trackId, slug });
    });

    return Ember.RSVP.all(promises).then((response) => {
      let problems = response.map((result) => {
        return result.get('firstObject');
      });
      return this.get('exercism').saveProblems(problems);
    });
  },

  actions: {
    refreshModel() {
      this.refresh();
    }
  }
});
