const { BrowserWindow, app, ipcMain,  } = require("electron");

app.on("ready", () => {
var mainWindow = null

  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    show: true
  })

  mainWindow.loadURL(`file://${__dirname}/public/index.html`)
  
})