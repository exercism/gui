import Ember from 'ember';

export default Ember.Route.extend({
  exercism: Ember.inject.service(),
  model(params) {
    let filePath = atob(params.path);
    return this.get('exercism').submit(filePath).then((status) => {
      status.submittedFile = filePath;
      if (status.error) {
        return status;
      }
      return { success: status };
    });
  }

});
