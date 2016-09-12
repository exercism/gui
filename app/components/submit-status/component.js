import Ember from 'ember';

const urlJoin = requireNode('url-join');

export default Ember.Component.extend({
  submissionPath: Ember.computed('status.submissionPath', function() {
    return urlJoin('http://exercism.io', this.get('status.submissionPath'));
  })
});
