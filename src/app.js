var login = require('./modulos/login/login.js')
var panel = require('./panel.js')
var milestones = require('./milestones.js')
var yo = require('yo-yo')

module.exports = function (state) {
  if (state.url === '/') return yo`<div><a href='/login'>login</a> <a href='/panel'>panel</a> <a href='/milestones'>milestones</a></div>`
  else if (state.url === '/login') return login(state)
  else if (state.url === '/panel') return panel(state)
  else if (state.url === '/milestones') return milestones(state)
  else return undefined
}
