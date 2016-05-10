var yo = require('yo-yo')
var ModMenu = require('./modulos/menu/menu.js')
var ModFooter = require('./modulos/footer/footer.js')
var footer = ModFooter('Copyright')
var state = {
  title: "El titulo",
  tabs: [
  {title: "Primer titulo", content: "Primer contenido"},
  {title: "Segundo titulo", content: "Segundo contenido"}
  ]
}

var menu = ModMenu(state)
var div = yo`<div>${menu}${footer}</div>`
document.body.appendChild(div)
