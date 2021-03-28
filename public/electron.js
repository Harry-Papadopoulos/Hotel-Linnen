const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const fs = require("fs");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL(
    isDev
      ? "http:localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

app.whenReady().then(() => {
  createWindow();
  fs.readFile("./linnenChanges.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let rooms = JSON.parse(data);
      win.webContents.on("dom-ready", () => {
        win.webContents.send("SEND_ROOM_STATE_TO_RENDERER", rooms);
      });
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("SEND_ROOM_STATE_TO_MAIN", (event, arg) => {
  fs.writeFile("./linnenChanges.txt", arg, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("All ok");
    }
  });
});
