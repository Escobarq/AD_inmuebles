const { BrowserWindow } = require('electron');

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.loadFile('../src/views/index.html');


  window.on('closed', function () {
    window = null;
  });

  window.setMenu(null);

  return window;
}

module.exports = { createWindow };
