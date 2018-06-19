const request = require('request');
const RequestDebugUI = require('../index');
const fs = require('fs');

const rd = new RequestDebugUI({
  port: 3001,
});
rd.startServer();
rd.addToDebug(request);

setTimeout(() => {
  request
    .get('http://ipv4.download.thinkbroadband.com/5MB.zip')
    .pipe(fs.createWriteStream('tex.zip'));
}, 5000);
