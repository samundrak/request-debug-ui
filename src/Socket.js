const io = require('socket.io-client');

class Socket {
  constructor(store) {
    this.store = store;
    let socketUrl = null;
    const socketHost = window.localStorage.getItem('socketHost');
    socketUrl =
      socketHost || `${window.location.protocol}//${window.location.host}`;
    this.io = io.connect(socketUrl);
  }

  listen() {
    this.io.on('info', this.handleSocketMessages.bind(this));
  }
  handleSocketMessages({ type, data, ...rest }) {
    let key = null;
    switch (type) {
      case 'request':
        this.store.addRequest(data);
        break;
      case 'response':
        this.store.updateRequestResponse(data);
        break;
      case 'start':
        console.log(rest);
        break;
      default:
        break;
    }
  }
}

export default Socket;
