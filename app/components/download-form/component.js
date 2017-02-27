import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

let Validations = buildValidations({
  uuid: validator('presence', {
    presence: true,
    dependentKeys: ['model.validationsDisabled'],
    disabled: Ember.computed.not('model.validationsEnabled')
  }),
});

export default Ember.Component.extend(Validations, {
  validationsEnabled: false,
  actions: {
    download() {
      this.set('validationsEnabled', true);
      if (this.get('validations.isValid')) {
        this.get('download')(this.get('uuid'));
      }
    }
  }
});
