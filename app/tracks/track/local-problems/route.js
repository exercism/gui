import Ember from 'ember';

const path = requireNode('path');

export default Ember.Route.extend({
  exercism: Ember.inject.service(),
  configuration: Ember.inject.service(),
  model() {
    let track = this.modelFor('tracks.track'),
        trackId = track.get('slug'),
        validSlugs = track.get('problems');
    return this.get('exercism').getLocalProblems(trackId, validSlugs);
  },

  actions: {
    submit(file, problem, dir) {
      let filePath = path.join(dir, file),
          language = this.modelFor('tracks.track').get('slug');
      this.get('exercism').submit(filePath, problem, language).then((response) => {
        window.console.log('aa', response);
      });
    }
  }
});
