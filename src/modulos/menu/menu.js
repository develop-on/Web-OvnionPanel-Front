var yo = require('yo-yo')
// var styles = require('./menu-css.js')

// var mc = styles['mdl-card']
// var mct = styles['mdl-card__title']

function idfy ( title ) {
  return '#' + title.split(' ').join('').toLowerCase()
}       
module.exports = function menu (state) {
var el = yo`<div>
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">

      <span class="mdl-layout-title">${state.title}</span>
    </div>

    <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
      ${state.tabs.map(function ( tab ) {
        return yo`<a href='${idfy(tab.title)}' class="mdl-layout__tab">${tab.title}</a>`
      })}
   </div>
  </header>
  <div class="mdl-layout__drawer">
    <span class="mdl-layout-title">Title</span>
  </div>
  <main class="mdl-layout__content">
    ${state.tabs.map( function ( tab ) {
      return yo`<section class="mdl-layout__tab-panel" id='${idfy(tab.title)}'>
      <div class="page-content">${tab.content}</div>
    </section>`
    })}
  </main>
</div>
</div>`	
return el
}

