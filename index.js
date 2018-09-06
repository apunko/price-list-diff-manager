const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Price list diff manager',
  });

  win.loadFile('./dist/index.html');
}

app.on('ready', createWindow);
