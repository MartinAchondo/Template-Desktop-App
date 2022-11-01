const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path')
const fs = require('fs')
const process = require('process')


ipcMain.on('mensaje_toMain',(evt,options)=>{
    const response = dialog.showMessageBox(null,options);
  });

  ipcMain.on('pass_html', (event,data)=>{
    path_file = path.join(process.cwd(),'frontend',data,data+'.html')
    fs.readFile(path_file,'utf-8', (err,html)=>{
      event.reply("ans_pass_html", html);
    }) 
  });

  
ipcMain.on('ask_path_toMain',(event,options)=>{
    dialog.showOpenDialog(mainWindow, options).then(result =>{
      mainWindow.webContents.send("ans_ask_path", result);
    }).catch(err =>{
      mainWindow.webContents.send("ans_ask_path", err);
    });
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


//module.exports = { menss }