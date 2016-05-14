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

<<<<<<< HEAD
var menu = ModMenu(state)
var div = yo`<div>${menu}<div class="footer">${footer}</div></div>`
=======
var menu = ModMenu(state, 'Primer titulo')
var div = yo`<div>${menu}${footer}</div>`
>>>>>>> 1db44f4af2e552381fe3a737b9a203af78a04379
document.body.appendChild(div)
