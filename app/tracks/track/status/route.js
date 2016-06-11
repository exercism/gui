import Ember from 'ember';

export default Ember.Route.extend({
  exercism: Ember.inject.service(),

  model(params) {
    return this.get('exercism').getStatus(params.track_id);
  }
});
