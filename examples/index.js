const request = require('request');
const RequestDebugUI = require('../index');

const rd = new RequestDebugUI();
rd.addToDebug(request);

request.get('http://www.google.com');
