import Ember from 'ember';

export default Ember.Component.extend({
  configuration: Ember.inject.service(),
  apiKeyUnset: Ember.computed.empty('configuration.apiKey'),
  trackIsNull: Ember.computed.empty('track'),
  disableActions: Ember.computed.or('apiKeyUnset', 'trackIsNull'),
  buttonClass: Ember.computed('disableActions', function() {
    let status = this.get('disableActions') ? 'disabled' : '';
    return `ui primary basic fluid button ${status}`;
  })
});
