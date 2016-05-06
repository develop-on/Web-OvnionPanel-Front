var yo = require('yo-yo')
var lg = require('./login.js')
var login = lg('OvniOn Panels')


var div = yo`<div id="contenedor">${login}</div>`
document.body.appendChild(div)