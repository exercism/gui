import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('track', params.track_id);
  }
});
