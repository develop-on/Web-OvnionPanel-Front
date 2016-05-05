var yo = require('yo-yo')
var csjs = require('csjs')
var getCss = require('csjs/get-css');
var lg = require('./login.js')
var login = lg('OvniOn Panel')
var styles = require('./login-css.js')


getCss(styles);
document.body.appendChild(login)