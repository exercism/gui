import Ember from 'ember';

export default Ember.Component.extend({
  configuration: Ember.inject.service(),

  link: Ember.computed('configuration.isConfigured', function() {
    return this.get('configuration.isConfigured') ? 'tracks' : 'configuration';
  })

});
