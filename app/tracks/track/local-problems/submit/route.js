import Ember from 'ember';

export default Ember.Route.extend({
  exercism: Ember.inject.service(),
  model(params) {
    let filePath = atob(params.path),
        props = this.get('exercism').getSubmitPayload(filePath),
        submission = this.store.createRecord('submission');
    return submission.submit(props).then((response) => {
      return {
        submissionPath: response.submission_path,
        submittedFile: filePath,
        iteration: response.iteration
      };
    }, (error) => {
      if (error.errors[0].status === '400') {
        return {
          error: error.errors[0].detail,
          submittedFile: filePath
        };
      }
      throw error;
    });
  }

});
