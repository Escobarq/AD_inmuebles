const { app } = require('electron');
const { createWindow } = require('./main');
const electronReload = require('electron-reload');

electronReload(__dirname);

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== '') app.quit();
});

app.on('activate', function () {
  if (window === null) {
    createWindow();
  }
});