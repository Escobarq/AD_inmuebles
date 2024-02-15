/* eslint-disable no-undef */
//Modules for app correct usage electron.js
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

function createWindow () {
  // Create a window
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
    }
  })
  //Load the window
  win.loadURL('http://localhost:6969');
  //menu hidebar invisible
  win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== '') {
    app.quit()
  }
})