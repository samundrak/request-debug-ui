const request = require('request');
const RequestDebugUI = require('../index');

const rd = new RequestDebugUI({
  port: 3001,
});
rd.startServer();
rd.addToDebug(request);

// setInterval(() => {
//   request.get('https://www.npmjs.com/package/request-debug');
// }, 10000);
