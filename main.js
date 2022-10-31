const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

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

/////////////////////////////////////////////////////////////

ipcMain.on('ask_path_toMain',(event,options)=>{
    dialog.showOpenDialog(mainWindow, options).then(result =>{
      mainWindow.webContents.send("ans_ask_path", result);
    }).catch(err =>{
      mainWindow.webContents.send("ans_ask_path", err);
    });
  });
  
 
  ipcMain.on('mensaje_toMain',(evt,options)=>{
    const response = dialog.showMessageBox(null,options);
  });
  
  ipcMain.on('ask_save_toMain',(event,options)=>{
    dialog.showSaveDialog(mainWindow, options).then(result =>{
      mainWindow.webContents.send("ans_save_path", result);
    }).catch(err =>{
      mainWindow.webContents.send("ans_save_path", err);
    });
  });
  
  ipcMain.on('ask_confirmation_toMain',(event,options)=>{
    dialog.showMessageBox(options).then(result =>{
      mainWindow.webContents.send("ans_confirmation_fromMain", result);
    }).catch(err =>{
      mainWindow.webContents.send("ans_confirmation_fromMain", err);
    });
  })