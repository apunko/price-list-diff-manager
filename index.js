const { app, BrowserWindow } = require('electron');
require('electron-reload')(__dirname);

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Price list diff manager',
  });
  win.webContents.openDevTools();
  win.loadURL('http://localhost:8080/');
  // win.loadFile('./dist/index.html');
}

app.on('ready', createWindow);
