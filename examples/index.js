const request = require('request');
const RequestDebugUI = require('../index');

const rd = new RequestDebugUI({
  port: 3001,
});
rd.startServer();
rd.addToDebug(request);

setTimeout(() => {
  request.get('http://ipv4.download.thinkbroadband.com/20MB.zip');
}, 10000);
