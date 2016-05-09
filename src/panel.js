var yo = require('yo-yo')
var ModMenu = require('./modulos/menu/menu.js')
var ModFooter = require('./modulos/footer/footer.js')
var footer = ModFooter('Copyright')
var menu = ModMenu('OvniOn Panel')


var div = yo`${menu}`
document.body.appendChild(div)