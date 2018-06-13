const socket = require('socket.io');

module.exports = (server, context) => {
  const io = socket(server);
  io.on('connection', socket => {});
  return io;
};
