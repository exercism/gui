import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

let Validations = buildValidations({
  uuid: validator('presence', {
    presence: true,
    dependentKeys: ['validationsDisabled'],
    disabled(model) {
      return model.get('validationsDisabled');
    }
  }),
});

export default Ember.Component.extend(Validations, {
  validationsDisabled: true,
  actions: {
    download() {
      this.set('validationsDisabled', false);
      if (this.get('validations.isValid')) {
        this.get('download')(this.get('uuid'));
      }
    }
  }
});
