var express = require('express');  
var request = require('request');
var ecstatic = require('ecstatic');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});

var app = express();  
app.use(ecstatic({ root: __dirname + '/build', handleError: false }))
app.use('/api', function(req, res) {  
    proxy.web(req, res, { target: 'http://192.168.1.43' });
});

app.listen(process.env.PORT || 8081);  
