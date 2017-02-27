import Ember from 'ember';

const fs = requireNode('fs'),
      path = requireNode('path'),
      electron = requireNode('electron');

export default Ember.Component.extend({
  selections: Ember.inject.service(),
  selectedFile: null,
  errorMessage: null,
  comment: null,
  refreshing: false,

  change() {
    this.set('errorMessage', null);
  },

  handleAction(callback) {
    let filePath = path.join(this.get('problem.dir'), this.get('selectedFile'));
    if (fs.existsSync(filePath)) {
      return callback(filePath);
    } else {
      this.set('errorMessage', `The file ${filePath} no longer exists`);
    }
  },

  actions: {
    submit() {
      this.handleAction((filePath) => {
        let selections = this.get('selections');
        selections.set('selectedFileToSubmit', filePath);
        selections.set('submitComment', this.get('comment'));
        this.get('attrs').submit();
      });
    },

    open() {
      this.handleAction((filePath) => {
        electron.shell.openItem(filePath);
      });
    },

    refresh() {
      this.set('refreshing', true);
      this.get('attrs').refresh();
      Ember.run.later(() => {
        // We wait a little since usually the response
        // is very fast and the visual feedback is lost
        this.set('refreshing', false);
      }, 300);
    }
  }
});
