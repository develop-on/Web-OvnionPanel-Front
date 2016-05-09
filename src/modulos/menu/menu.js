var yo = require('yo-yo')
// var styles = require('./menu-css.js')

// var mc = styles['mdl-card']
// var mct = styles['mdl-card__title']

module.exports = function menu (title) {
return yo`<div>
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">

      <span class="mdl-layout-title">${title}</span>
    </div>

    <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
      <a href="#scroll-tab-1" class="mdl-layout__tab is-active">Modulo 1</a>
      <a href="#scroll-tab-2" class="mdl-layout__tab">Modulo 2</a>
      <a href="#scroll-tab-3" class="mdl-layout__tab">Modulo 3</a>
      <a href="#scroll-tab-4" class="mdl-layout__tab">Modulo 4</a>
      <a href="#scroll-tab-5" class="mdl-layout__tab">Modulo 5</a>
      <a href="#scroll-tab-6" class="mdl-layout__tab">Modulo 6</a>
    </div>
  </header>
  <div class="mdl-layout__drawer">
    <span class="mdl-layout-title">Title</span>
  </div>
  <main class="mdl-layout__content">
    <section class="mdl-layout__tab-panel is-active" id="scroll-tab-1">
      <div class="page-content"></div>
    </section>
    <section class="mdl-layout__tab-panel" id="scroll-tab-2">
      <div class="page-content"></div>
    </section>
    <section class="mdl-layout__tab-panel" id="scroll-tab-3">
      <div class="page-content"></div>
    </section>
    <section class="mdl-layout__tab-panel" id="scroll-tab-4">
      <div class="page-content"></div>
    </section>
    <section class="mdl-layout__tab-panel" id="scroll-tab-5">
      <div class="page-content"></div>
    </section>
    <section class="mdl-layout__tab-panel" id="scroll-tab-6">
      <div class="page-content"></div>
    </section>
  </main>
</div>
</div>`	
}
