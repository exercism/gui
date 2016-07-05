import Ember from 'ember';
import getRightClickMenu from 'exercism-gui/utils/right-click-menu';

const {remote} = requireNode('electron');
const menu = getRightClickMenu();

/*TODO: this is a super lame hack
 Ideally, this code would live under electron.js
 and we would use the webContents event emitter
 this is here as a workaround for ticket #26
 See also issues 71 and 75 at ember-electron
*/
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);

export default Ember.Route.extend({
  actions: {
    refreshModel() {
      this.refresh();
    }
  }
});
