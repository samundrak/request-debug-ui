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
        if (!_requests) return;
        if (self.configs.cleanup) {
          self._requests.delete(data.debugId);
        } else {
          _requests.response = {
            created_at: Date.now(),
            data,
          };
        }
      } else {
        self._requests.set(data.debugId, {
          request: { data, created_at: Date.now() },
          response: {},
        });
      }
      const req = self._requests.get(data.debugId);
      if (req) {
        self.io.emit('info', {
          type,
          data: req[type],
        });
      }
    });
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
    return new Promise(resolve => {
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
