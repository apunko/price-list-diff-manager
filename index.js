// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow } = require('electron');
require('electron-log');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: process.env.IS_PROD ? 800 : 1000,
    height: process.env.IS_PROD ? 600 : 700,
    title: 'Price list diff manager',
  });

  if (process.env.IS_PROD) {
    win.loadFile('./dist/index.html');
  } else {
    win.webContents.openDevTools();
    win.loadURL('http://localhost:8080/');
  }
}

app.on('ready', createWindow);
