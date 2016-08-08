import Ember from 'ember';

export default Ember.Component.extend({
  submissionPath: Ember.computed('status.submissionPath', function() {
    return `http://exercism.io/${this.get('status.submissionPath')}`;
  })
});
