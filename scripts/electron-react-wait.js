const net = require('net');

const port = 8080;

process.env.ELECTRON_START_URL = 'http://localhost:8080';

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({ port }, () => {
  client.end();
  if (!startedElectron) {
    console.log('starting electron');
    startedElectron = true;
    const { exec } = require('child_process');

    exec('yarn start');
  }
});

tryConnection();

client.on('error', () => {
  setTimeout(tryConnection, 1000);
});
