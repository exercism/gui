const {remote} = requireNode('electron');
const {Menu} = remote;

export default function() {
  let template = [
    { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:', role: 'cut' },
    { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:', role: 'copy' },
    { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:', role: 'paste' },
    { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:', role: 'selectall' },
    { type: 'separator' },
    { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:', role: 'undo'},
    { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:', role: 'redo' },
    { type: 'separator' },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          click(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          }
        },
        {
          label: 'Toggle Full Screen',
          click(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          }
        },
        {
          label: 'Toggle Developer Tools',
          click(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.webContents.toggleDevTools();
            }
          }
        },
      ]
    }
  ];
  return Menu.buildFromTemplate(template);
}
