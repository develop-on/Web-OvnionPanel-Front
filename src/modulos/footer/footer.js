var yo = require('yo-yo')
// var styles = require('./menu-css.js')

// var mc = styles['mdl-card']
// var mct = styles['mdl-card__title']

module.exports = function footer (title) {
return yo`<div>
<footer class="mdl-mini-footer">
  <div class="mdl-mini-footer__left-section">
    <div class="mdl-logo">${title}</div>
    <ul class="mdl-mini-footer__link-list">
      <li><a href="#">Help</a></li>
      <li><a href="#">Privacy & Terms</a></li>
    </ul>
  </div>
</footer>
</div>`	
}

