const { BrowserWindow, app, ipcMain,  } = require("electron");
// require("./app");

let onlineStatusWindow
let mainWindow = null

function createWindow() {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/index.html`)

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
  mainWindow.webContents.openDevTools()

  mainWindow.on("closed", () => {
    mainWindow = null
  })
}

app.on("ready", createWindow)

ipcMain.on("buscar-impressoras", (event, arg) => {
  let windPrint = new BrowserWindow({ show: false });
  var printers = windPrint.webContents.getPrinters()

  event.returnValue = printers
})

ipcMain.on("realizar-impressao", (event, arg) => {
  console.log(arg)
  let windPrint = new BrowserWindow({ show: false });
  windPrint.loadURL(
    `file://${__dirname}/src/assets/PrintModall.txt`
  );

  windPrint.webContents.on('did-finish-load', () => {
    windPrint.webContents.print({ silent: true, deviceName: arg.name },
      (success, error) => {
        if (error) {
          console.log(error);
          event.returnValue = false;
        }
        console.log(success);
        event.returnValue = success;
      })
  })
  
  console.log('chegou aqui!')
  return event.returnValue = false;
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