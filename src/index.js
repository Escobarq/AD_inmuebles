const { app } = require('electron');
const { createWindow } = require('./main');

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (window === null) {
    createWindow();
  }
});