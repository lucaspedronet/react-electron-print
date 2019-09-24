const { BrowserWindow, app, ipcMain } = require("electron");

let onlineStatusWindow;

app.on("ready", () => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false });
  onlineStatusWindow.loadURL(`file://${__dirname}/index.html`);

  var mainWindow = null;
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    show: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // mainWindow.loadURL(`file://${__dirname}/public/index.html`)
  mainWindow.loadURL("http://localhost:3000");
  mainWindow.webContents.openDevTools();

  ipcMain.on("buscar-impressoras", (event, arg) => {
    console.log(event);
    console.log(arg);

    const windPrint = new BrowserWindow({ show: false });
    var printers = windPrint.webContents.getPrinters();

    windPrint.webContents.on("did-finish-load", () => {
      windPrint.webContents.print({ silent: true }, (succees, err) => {
        if (err) throw err;
        console.log(succees);
      });
    });

    event.returnValue = new Promise((resolve, reject) => {
      windPrint.webContents.on("did-finish-load", () => {
        windPrint.webContents.print(
          { silent: true, deviceName: "" },
          (success, err) => {
            if (err) throw reject(err);
            console.log(success);
            resolve(success);
          }
        );
      });
    });
  });

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
});
