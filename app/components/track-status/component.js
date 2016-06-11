import Ember from 'ember';

export default Ember.Component.extend({
  noSubmissions: Ember.computed.match('status.recent.problem', /^.*any solutions.*/)
});
