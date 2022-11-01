const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const functions = require('./window/functions')

let mainWindow;

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1080,
    height: 670,
    resizable: false,
    //icon: path.join(__dirname,'window','icon','favicon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname,'window','preload.js'),
      devTools: true
    }
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL('http://localhost:8000/index.html');
  
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
