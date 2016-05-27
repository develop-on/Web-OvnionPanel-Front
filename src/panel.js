var yo = require('yo-yo')
var ModMenu = require('./modulos/menu/menu.js')
var ModFooter = require('./modulos/footer/footer.js')
var ModDialog = require('./modulos/dialog/dialog.js')
var dialog = ModDialog(yo``)
var footer = ModFooter('Copyright')

module.exports = function (state) {return  yo`<div>${ModMenu(state)}<div class="footer">${footer}</div></div>`}
