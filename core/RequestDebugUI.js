const requestDebug = require('request-debug');
const server = require('./server');

class RequestDebugUI {
  constructor(configs = {}) {
    this.configs = { ...configs };
    this.requestInstances = [];
    this._requests = new Map();
  }

  addToDebug(request) {
    requestDebug(request, function(type, data, r) {
      // put your request or response handling logic here
      if (type === 'response') {
        const _requests = this._requests.get(data.debugId);
        if (_requests) return;
        if (this.configs.cleanup) {
          this._requests.delete(data.debugId);
        } else {
          _requests.response = data;
        }
      } else {
        this._requests.set(data.debugId, {
          request: data,
          response: {},
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
    server(this, (io, server) => {
      this.io = io;
      this.server = server;
    });
  }
}
RequestDebugUI.IS_PLUGGED = false;
module.exports = RequestDebugUI;
