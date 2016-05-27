// var express = require('express');  
// var request = require('request');
// var ecstatic = require('ecstatic');
// var httpProxy = require('http-proxy');
// var fs = require('fs')

// var proxy = httpProxy.createProxyServer({});

// var app = express();  
// app.use('/', function (req, res) {return ecstatic({ root: __dirname + '/build', handleError: false })})
// app.use(ecstatic({ root: __dirname + '/build/assets', handleError: false }))
// app.use('/api', function(req, res) {  
//     proxy.web(req, res, { target: 'http://192.168.1.43' });
// });

// app.listen(process.env.PORT || 8081);  
var fs = require('fs')
var path = require('path')
var xtend = require('xtend')
var hyperstream = require('hyperstream')
var app = require('./src/app.js')

var ecstatic = require('ecstatic')
var st = ecstatic(path.join(__dirname, 'build'))

var http = require('http')

var server = http.createServer(function (req, res) {
  var state = {
  milestones: [],
  url: '',
  title: "El titulo",
  tabs: [
  {title: "Primer titulo", content: "Primer contenido", activeTab: true},
  {title: "Segundo titulo", content: "Segundo contenido"},
  {title: "tercer titulo", content: "Segundo contenido"},
  {title: "cuarto titulo", content: "Segundo contenido"},
  {title: "cuarto titulo", content: "Segundo contenido"},
  {title: "cuarto titulo", content: "Segundo contenido"}
  ]
}
  if (!app(xtend(state, {url: req.url}))) return st(req, res)
    var elem =  app(xtend(state, {url: req.url}))
  read('index.html').pipe(hyperstream({
      '#content': elem.toString()
    })).pipe(res)
})
server.listen(8000)

function read (x) {
  return fs.createReadStream(path.join(__dirname, 'build', x))
}
