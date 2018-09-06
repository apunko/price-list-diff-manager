const { app, BrowserWindow } = require('electron');
require('electron-reload')(__dirname);

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Price list diff manager',
  });
  win.webContents.openDevTools();
  win.loadURL('http://localhost:8080/');
  // win.loadFile('./dist/index.html');
}

app.on('ready', createWindow);
