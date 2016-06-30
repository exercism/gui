import Ember from 'ember';

export default Ember.Component.extend({
  selectedFile: null,

  actions: {
    submit() {
      this.attrs.submit(
        this.get('selectedFile'),
        this.get('problem.name'),
        this.get('problem.dir')
      );
    }
  }
});
