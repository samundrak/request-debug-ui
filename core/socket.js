const socket = require('socket.io');

module.exports = (server, context) => {
  const io = socket(server);
  io.on('connection', socket => {
    const requests = context._requests.values();
    socket.emit('info', {
      type: 'start',
      requests,
    });
    console.log('got new connection');
  });
  return io;
};
