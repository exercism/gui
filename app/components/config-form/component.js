import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

let presenceOptions = {
  presence: true,
  dependentKeys: ['validationsDisabled'],
  disabled(model) {
    return model.get('validationsDisabled');
  }
};

let Validations = buildValidations({
  dir: validator('presence', presenceOptions),
  api: validator('presence', presenceOptions),
  xapi: validator('presence', presenceOptions),
  apiKey: validator('presence', presenceOptions)
});


export default Ember.Component.extend(Validations, {
  showingAdvanced: false,
  validationsDisabled: true,

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
      this.set('validationsDisabled', false);
      if (this.get('validations.isValid')) {
        let dir = this.get('dir'),
            apiKey = this.get('apiKey'),
            api = this.get('api'),
            xapi = this.get('xapi');
        this.attrs.saveConfig({ dir, apiKey, api, xapi });
      }
    }
  }
});
