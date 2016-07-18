import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    download(uuid) {
      this.transitionTo('download.status', uuid);
    }
  }

});
