var yo = require('yo-yo')

module.exports = function milestones ( state ) {
  return yo`<div>titulos<ul>${state.milestones.map(function (milestone) {
    return yo`<li>${milestone.title}</li>`
  })}</ul></div>`
}
