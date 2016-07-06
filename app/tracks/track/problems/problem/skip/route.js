import Ember from 'ember';

export default Ember.Route.extend({
  exercism: Ember.inject.service(),

  model() {
    let trackId = this.paramsFor('tracks.track').track_id,
        slug = this.paramsFor('tracks.track.problems.problem').problem_id,
        problem = this.store.createRecord('problem', { trackId, slug });
    return problem.skip().then(() => {
      return { slug, track: trackId };
    });
  }

});
