import Ember from 'ember';

const path = requireNode('path');

export default Ember.Component.extend({
  selectedFile: null,

  actions: {
    submit() {
      let filePath = path.join(this.get('problem.dir'), this.get('selectedFile'));
      this.attrs.submit(btoa(filePath));
    }
  }
});
