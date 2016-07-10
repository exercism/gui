import Ember from 'ember';

const {remote} = requireNode('electron');

export default Ember.Component.extend({
  tagName: '',

  actions: {
    reload() {
      remote.getCurrentWindow().reload();
    },

    toggleDevTools() {
      remote.getCurrentWindow().webContents.toggleDevTools();
    },
    toggleFullScreen() {
      let win = remote.getCurrentWindow();
      win.setFullScreen(!win.isFullScreen());
    },

  }
});
