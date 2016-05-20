var login = require('./modulos/login/login.js')
var panel = require('./panel.js')
var yo = require('yo-yo')

module.exports = function (state) {
  if (state.url === '/') return yo`<div><a href='/login'>login</a> <a href='/panel'>panel</a></div>`
  else if (state.url === '/login') return login(state)
  else if (state.url === '/panel') return panel(state)
  else return undefined
}
