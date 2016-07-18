import Ember from 'ember';

export default Ember.Route.extend({
  exercism: Ember.inject.service(),

  model(params) {
    return this.store.findRecord('submission', params.submission_id).then((submission) => {
      let path = this.get('exercism').saveSubmittedFiles(submission);
      return { path, error: null };
    }).catch((error) => {
      Ember.Logger.error(error);
      let message = error.errors[0].detail;
      return { path: null, error: message };
    });
  }
});
