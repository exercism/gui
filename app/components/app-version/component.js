import Ember from 'ember';
import ENV from 'exercism-gui/config/environment';
const { releaseTag } = ENV.APP;

export default Ember.Component.extend({
  tagName: '',
  releaseTag
});
