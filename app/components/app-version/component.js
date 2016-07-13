import Ember from 'ember';
import ENV from 'exercism-gui/config/environment';

const { releaseTag } = ENV.APP;
const semver = requireNode('semver');

export default Ember.Component.extend({
  tagName: '',
  releaseTag: Ember.computed(function() {
    return semver.clean(releaseTag);
  })
});
