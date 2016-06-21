import Ember from 'ember';

export default Ember.Route.extend({
  exercism: Ember.inject.service(),

  model(params) {
    let trackId = this.paramsFor('tracks.track').track_id;
    return this.get('exercism').getLatestSubmission(trackId, params.slug);
  }
});
