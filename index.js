// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow } = require('electron');
require('electron-log');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: process.env.IS_DEV ? 1000 : 1000,
    height: process.env.IS_DEV ? 700 : 700,
    title: 'Price list diff manager',
  });

  if (process.env.IS_DEV) {
    win.webContents.openDevTools();
    win.loadURL('http://localhost:8080/');
  } else {
    win.loadFile('./dist/index.html');
  }
}

app.on('ready', createWindow);
