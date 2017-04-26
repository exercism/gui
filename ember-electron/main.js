/* eslint-env node */
const { app, BrowserWindow, protocol, shell } = require('electron');
const { dirname, join, resolve } = require('path');
const protocolServe = require('electron-protocol-serve');
const localshortcut = require('electron-localshortcut');

let mainWindow = null;

protocol.registerStandardSchemes(['serve'], { secure: true });
protocolServe({
  cwd: join(__dirname || resolve(dirname('')), '..', 'ember'),
  app,
  protocol,
});

// Uncomment the lines below to enable Electron's crash reporter
// For more information, see http://electron.atom.io/docs/api/crash-reporter/

// electron.crashReporter.start({
//     productName: 'YourName',
//     companyName: 'YourCompany',
//     submitURL: 'https://your-domain.com/url-to-submit',
//     autoSubmit: true
// });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
      app.quit();
  }
});

app.on('ready', () => {
    mainWindow = new BrowserWindow({
      minWidth: 1024,
      minHeight: 768,
      width: 1024,
      height: 768,
      icon: join(__dirname, 'resources', 'icons', 'linux.png')
    });


    mainWindow.setMenu(null);

    mainWindow.maximize();

    // delete mainWindow.module;

    const emberAppLocation = `file://${__dirname}/../ember/index.html`;

    // If you want to open up dev tools programmatically, call
    // mainWindow.openDevTools();

    mainWindow.loadURL(emberAppLocation);

    // If a loading operation goes wrong, we'll send Electron back to
    // Ember App entry point
    mainWindow.webContents.on('did-fail-load', () => {
        mainWindow.loadURL(emberAppLocation);
    });

    mainWindow.webContents.on('crashed', () => {
      console.log('Your Ember app (or other code) in the main window has crashed.');
      console.log('This is a serious issue that needs to be handled and/or debugged.');
    });

    mainWindow.on('unresponsive', () => {
      console.log('Your Ember app (or other code) has made the window unresponsive.');
    });

    mainWindow.on('responsive', () => {
      console.log('The main window has become responsive again.');
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Open external links in default browser
    let handleRedirect = (e, url) => {
      if(url !== mainWindow.webContents.getURL()) {
        e.preventDefault();
        shell.openExternal(url);
      }
    };

    mainWindow.webContents.on('will-navigate', handleRedirect);
    mainWindow.webContents.on('new-window', handleRedirect);

    // Shortcuts
    localshortcut.register(mainWindow, 'F11', () => {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
    });

    localshortcut.register(mainWindow, 'Shift+CmdOrCtrl+I', () => {
      mainWindow.webContents.toggleDevTools();
    });

    localshortcut.register(mainWindow, 'CmdOrCtrl+R', () => {
      mainWindow.reload();
    });
});


process.on('uncaughtException', (err) => {
  console.log('An exception in the main thread was not handled.');
  console.log('This is a serious issue that needs to be handled and/or debugged.');
  console.log(`Exception: ${err}`);
});
