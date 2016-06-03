var yo = require('yo-yo')
var styles = require('./cuadro_css.js')

module.exports = function login (titulox,contenido,color) {
var style = styles(color);
var titulo = style['titulo']
var contenidox = style['contenido']
var cuadro = style['cuadro']
 return yo`<div class="${cuadro}">
<div class="${titulo}">${titulox}</div>
<div class="${contenidox}">${contenido}</div>
</div>`	
}