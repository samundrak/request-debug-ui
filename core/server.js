const express = require('express');
const getPort = require('get-port');
const app = express();

module.exports = (context, done = () => null) => {
  const { configs } = context;
  getPort(configs.port).then(port => {
    const server = app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
    const io = require('./socket')(server, context);
    done(io, server);
  });
};
