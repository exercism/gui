import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

let Validations = buildValidations({
  dir: validator('presence', true),
  api: validator('presence', true),
  xapi: validator('presence', true),
  apiKey: validator('presence', true)
});


export default Ember.Component.extend(Validations, {
  flashMessages: Ember.inject.service(),
  configuration: Ember.inject.service(),

  showInvalid: false,

  init() {
    this._super(...arguments);
    this.resetForm();
  },

  resetForm() {
    this.setProperties(this.get('config'));
    this.set('showInvalid', false);
  },

  actions: {
    saveConfig() {
      this.set('showInvalid', true);
      if (this.get('validations.isValid')) {
        let dir = this.get('dir'),
            apiKey = this.get('apiKey'),
            api = this.get('api'),
            xapi = this.get('xapi');

        this.get('configuration').writeConfigFile({ dir, apiKey, api, xapi });
        this.get('flashMessages').positive(`Configuration saved to ${this.get('configFilePath')}`);
      }
    }
  }
});
