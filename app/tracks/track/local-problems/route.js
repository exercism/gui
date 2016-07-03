import Ember from 'ember';

export default Ember.Route.extend({
  exercism: Ember.inject.service(),
  model() {
    let track = this.modelFor('tracks.track'),
        trackId = track.get('slug'),
        validSlugs = track.get('problems');
    return this.get('exercism').getLocalProblems(trackId, validSlugs);
  },

  actions: {
    submit(filePath) {
      this.transitionTo('tracks.track.local-problems.submit', filePath);
    }
  }

});
