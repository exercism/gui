import Ember from 'ember';

const lodash = requireNode('lodash');

export default Ember.Route.extend({
  exercism: Ember.inject.service(),

  model() {
    let problem = this.store.createRecord('problem');

    return problem.restoreAll().then((response) => {
      this.store.deleteRecord(problem);

      let track_id = this.paramsFor('tracks.track').track_id,
          filteredProblems = lodash.filter(response.problems, { track_id });

      return this.get('exercism').saveProblems(filteredProblems);
    });
  },

  actions: {
    refreshModel() {
      this.refresh();
    }
  }
});
