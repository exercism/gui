import Ember from 'ember';

export default Ember.Route.extend({
  exercism: Ember.inject.service(),
  model() {
    return this.get('exercism').getTracks();
  }
});
