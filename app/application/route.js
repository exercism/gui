import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    refreshModel() {
      this.refresh();
    }
  }
});
