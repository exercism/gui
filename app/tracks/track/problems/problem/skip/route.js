import Ember from 'ember';

export default Ember.Route.extend({
  exercism: Ember.inject.service(),
  model() {
    let track = this.paramsFor('tracks.track').track_id,
        slug = this.paramsFor('tracks.track.problems.problem').problem_id;
    return this.get('exercism').skip(track, slug).then((response) => {
      window.console.log(response);
      return response;
    });
  }

});
