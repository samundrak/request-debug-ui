const requestDebug = require('request-debug');
const server = require('./server');

class RequestDebugUI {
  constructor(configs = {}) {
    this.configs = { ...configs };
    this.requestInstances = [];
    this._requests = new Map();
  }

  addToDebug(request) {
    const self = this;
    requestDebug(request, function(type, data, r) {
      // put your request or response handling logic here
      const _requests = self._requests.get(data.debugId);

      if (type === 'response') {
        r.on('end', () => {
          _requests.response = {
            created_at: Date.now(),
            data,
          };

          self.emitToClients({
            type,
            data: self._requests.get(data.debugId).response,
          });
        });
      } else {
        self._requests.set(data.debugId, {
          request: { data, created_at: Date.now() },
          response: {},
        });
        self.emitToClients({
          type,
          data: self._requests.get(data.debugId).request,
        });
      }
    });
  }
  emitToClients(data) {
    this.io.emit('info', data);
  }
  start() {
    if (RequestDebugUI.IS_PLUGGED) {
      console.error('RequestDebugUI has already plugged.');
      return;
    }
    this.startServer();
    RequestDebugUI.IS_PLUGGED = true;
  }

  stop() {
    // Stop http server
    this.server.close();
  }

  startServer() {
    return new Promise((resolve) => {
      server(this, (io, server) => {
        this.io = io;
        this.server = server;
        resolve();
      });
    });
  }
}
RequestDebugUI.IS_PLUGGED = false;
module.exports = RequestDebugUI;
