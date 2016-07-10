import Ember from 'ember';

export default Ember.Route.extend({
  exercism: Ember.inject.service(),

  model(params) {
    let trackId = this.paramsFor('tracks.track').track_id;
    return this.store.queryRecord('submission', { track_id: trackId, slug: params.slug });
  }
});
