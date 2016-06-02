var yo = require('yo-yo')
 var style = require('./circle_bar_css.js')



module.exports = function circle_bar (porcentaje,color) {

var styles = style(color)
var progress = styles['porcentajex']


    var val = porcentaje;
    var r = "90";
    var c = Math.PI*(r*2);
   
    if (val < 0) { val = 0;}
    if (val > 100) { val = 100;}
    
    var pct = ((100-val)/100)*c;

 return yo`<div>
 <div class="${progress}">${porcentaje}</div>
<svg  width="200" stroke="${color}" stroke-width="12" height="200">
  <circle r="90" cx="100" cy="100" fill="#E3E3E3" stroke-dasharray="565.48" style="stroke-dashoffset: ${pct}px">${porcentaje}</circle>
</svg>
  </div>`
}

