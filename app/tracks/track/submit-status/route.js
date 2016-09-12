import Ember from 'ember';

export default Ember.Route.extend({
  exercism: Ember.inject.service(),
  selections: Ember.inject.service(),

  beforeModel() {
    let selections = this.get('selections');
    if (!selections.get('selectedFileToSubmit')) {
      this.transitionTo('tracks.track.local-problems', this.get('selections.selectedTrack'));
    }
  },

  model() {
    let filePath = this.get('selections.selectedFileToSubmit'),
        comment = this.get('selections.submitComment'),
        props = this.get('exercism').getSubmitPayload(filePath, comment),
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
    }).finally(() => {
      let selections = this.get('selections');
      selections.set('selectedFileToSubmit', null);
      selections.set('submitComment', null);
    });
  }
});
