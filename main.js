const { BrowserWindow, app, ipcMain } = require("electron");

let mainWindow = null

function createWindow(){
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    show: true
  });
  
  // mainWindow.loadURL(`file://${__dirname}/public/index.html`);
  mainWindow.loadURL("http://localhost:3000");
  
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);
