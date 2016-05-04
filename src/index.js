var yo = require('yo-yo')
var login = login('OvniOn Panel')

//************************* modulo login *******************************************//

function login (text) {
 return yo`<div class="login"><div class="demo-card-square mdl-card mdl-shadow--2dp">
  <div class="mdl-card__title mdl-card--expand">
    <h2 class="mdl-card__title-text">${text}</h2>
  </div>
  <div class="mdl-card__supporting-text">
<form action="#">
  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <input class="mdl-textfield__input" type="text" id="sample3">
    <label class="mdl-textfield__label" for="sample3">Usuario</label>
  </div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <input class="mdl-textfield__input" type="text" id="sample3">
    <label class="mdl-textfield__label" for="sample3">Contraseña</label>
  </div>
</form>
  </div>
  <div class="mdl-card__actions mdl-card--border">
    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
     Login
    </a>
  </div>
</div></div>`	
}
//************************* fin - modulo login *******************************************//

document.body.appendChild(login)





