const { BrowserWindow, app, ipcMain } = require("electron");
const path = require("path");

app.on("ready", () => {
  let mainWindow = new BrowserWindow({
    height: 400,
    width: 600,
    show: true
  });

  mainWindow.loadURL(path.join(__dirname, "src", "app.html"));

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  ipcMain.on("get-print", () => {
    console.log("Prints");
  });
});
