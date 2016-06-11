import Ember from 'ember';

export default Ember.Controller.extend({
  configuration: Ember.inject.service(),
  apiKeyUnset: Ember.computed.empty('configuration.apiKey')
});
