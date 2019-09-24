const { BrowserWindow, app, ipcMain,  } = require("electron");
// require("./app");

let onlineStatusWindow
let mainWindow = null

function createWindow() {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/index.html`)

  var mainWindow = null;
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    show: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  // mainWindow.loadURL(`file://${__dirname}/public/index.html`)
  mainWindow.loadURL("http://localhost:3000");
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null
  })
}

app.on("ready", createWindow)

ipcMain.on("buscar-impressoras", (event, arg) => {
  console.log(arg)
  const windPrint = new BrowserWindow({ show: false });
  var printers = windPrint.webContents.getPrinters()

  windPrint.webContents.on("did-finish-load", () => {
    windPrint.webContents.print({ silent: true }, (succees, err) => {
      if(err) throw err;
      console.log(succees)
    })
  })
  event.returnValue = printers
})

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});
