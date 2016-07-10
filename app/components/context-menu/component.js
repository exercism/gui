import Ember from 'ember';

const {remote} = requireNode('electron');
const {Menu}   = remote;

let template = [
  { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:', role: 'cut' },
  { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:', role: 'copy' },
  { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:', role: 'paste' },
  { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:', role: 'selectall' },
  { type: 'separator' },
  { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:', role: 'undo'},
  { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:', role: 'redo' }
];

const menu = Menu.buildFromTemplate(template);

/*TODO: this is a super lame hack
 Ideally, this code would live under electron.js
 and we would use the webContents event emitter
 see tickets #26 and #28
*/

export default Ember.Component.extend({
  tagName: '',

  init() {
    this._super(...arguments);
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      menu.popup(remote.getCurrentWindow());
    }, false);
  }
});
