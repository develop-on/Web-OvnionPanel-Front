var yo = require('yo-yo')
// var style = require('./circle_bar_css.js')

module.exports = function circle_bar () {
// var styles = style(colorx)
// var slice = styles['slice']  
// var bar = styles['bar']
// var fill = styles['fill']
// var c100 = styles['c100'] +" "+styles['p'+progress] +" "+ styles[size] +" "+ styles['color'];
// var progress = progress;


 return yo`<div>

		<div id="cont" data-pct="100">
		<svg id="svg" width="200" height="200" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
		  <circle r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
		  <circle id="bar" r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
		</svg>
		</div>

 	</div>`	
}

