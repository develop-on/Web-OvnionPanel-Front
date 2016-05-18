var login = require('./modulos/login/login.js')
var menu = require('./modulos/menu/menu.js')
var yo = require('yo-yo')

module.exports = function (state) {
  if (state.url === '/login') return login(state)
  else if (state.url === '/menu') return menu(state)
  else return yo`<div><a href='/login'>login</a> <a href='/menu'>menu</a></div>`
}
