var http = require('http')
var store = require('./store.js')
var JSONStream = require('JSONStream')

var options = {
  hostname: 'api.github.com',
  port: 80,
  path: '/repos/minedutdf/manual/issues',
  method: 'GET',
  headers: {
  }
};

var req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.pipe(JSONStream.parse('*.title')).on('data', (obj) => {
    console.log(obj)
    return store({type: 'milestones', payload: {title: obj}})
  });
  res.on('end', () => {
    console.log('No more data in response.')
  })
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

module.exports = function () { return req.end(); }
