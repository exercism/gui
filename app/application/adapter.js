import Ember from 'ember';
import ActiveModelAdapter from 'active-model-adapter';

export default ActiveModelAdapter.extend({
  configuration: Ember.inject.service(),
  host: Ember.computed(function() {
    return this.get('configuration.xapi');
  })
});
