var yo = require('yo-yo')
var lg = require('./login.js')
var login = lg('')


var div = yo`<div id="container"><div class="center">${login}</div></div>`
document.body.appendChild(div)