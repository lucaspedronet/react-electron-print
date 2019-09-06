const { BrowserWindow, app, ipcMain } = require("electron");
const mainWindow = null;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    height: 400,
    width: 600,
    show
  });
});
