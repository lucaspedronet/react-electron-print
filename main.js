const { BrowserWindow, app, ipcMain,  } = require("electron");
let onlineStatusWindow

app.on("ready", () => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/index.html`)
var mainWindow = null

  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    show: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(`file://${__dirname}/public/index.html`)

  ipcMain.on("buscar-impressoras", (event, arg) => {
    console.log(event)
    console.log(arg)
    
    const windPrint = new BrowserWindow({ show: false });
    var printers = windPrint.webContents.getPrinters()

    windPrint.webContents.on("did-finish-load", () => {
      windPrint.webContents.print({ silent: true }, (succees, err) => {
        if(err) throw new err();
        console.log(succees)
      })
    })

    event.returnValue = printers
    
  })
  
})