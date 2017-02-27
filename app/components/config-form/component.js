import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

let presenceOptions = {
  presence: true,
  dependentKeys: ['model.validationsDisabled'],
  disabled: Ember.computed.not('model.validationsEnabled')
};

let Validations = buildValidations({
  dir: validator('presence', presenceOptions),
  api: validator('presence', presenceOptions),
  xapi: validator('presence', presenceOptions),
  apiKey: validator('presence', presenceOptions)
});


export default Ember.Component.extend(Validations, {
  showingAdvanced: false,
  validationsEnabled: false,

  init() {
    this._super(...arguments);
    this.resetForm();
  },

  resetForm() {
    this.setProperties(this.get('config'));
    this.set('validationsDisabled', true);
  },

  actions: {
    saveConfig() {
      this.set('validationsEnabled', true);
      if (this.get('validations.isValid')) {
        let dir = this.get('dir'),
            apiKey = this.get('apiKey'),
            api = this.get('api'),
            xapi = this.get('xapi');
        this.get('attrs').saveConfig({ dir, apiKey, api, xapi });
      }
    }
  }
});
