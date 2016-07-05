import Ember from 'ember';

const lodash = requireNode('lodash');

export default Ember.Component.extend({
  didUpdateAttrs() {
    this._super(...arguments);
    // replace the old selected problem on model refresh
    let name = this.get('selectedProblem.name'),
        problem = lodash.find(this.get('problems'), { name });
    this.set('selectedProblem', (problem) ? problem : null);
  }
});
