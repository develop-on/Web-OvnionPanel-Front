var yo = require('yo-yo')
var ModMenu = require('./modulos/menu/menu.js')
var ModFooter = require('./modulos/footer/footer.js')
var footer = ModFooter('Copyright')
var state = {
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

var menu = ModMenu(state, 'Primer titulo')
var div = yo`<div>${menu}${footer}</div>`
document.body.appendChild(div)
