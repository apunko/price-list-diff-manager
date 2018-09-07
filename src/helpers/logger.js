import * as Log from 'electron-log';

const Logger = {
  info: (message) => {
    Log.info(`${Date(Date.now)}:\n ${message}`);
  },
};

export default Logger;
