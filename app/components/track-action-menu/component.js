import Ember from 'ember';

export default Ember.Component.extend({
  configuration: Ember.inject.service(),
  apiKeyUnset: Ember.computed.empty('configuration.apiKey')
});
