var yo = require('yo-yo')
var ModCircle = require('./modulos/circle_bar/circle_bar.js')
var ModCuadro = require('./modulos/cuadro/cuadro.js')

function RandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    	lum = "-0.3";
    	hex = color;

    	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

function RandomNumber() {
	var number = Math.floor(Math.random() * 100) + 0;
	return number;
}

module.exports = function milestones ( state ) {
	return yo`<div>${state.milestones.map(function (milestone) {
		title = yo`${milestone.title} `;
		close_issues = yo`${milestone.close_issues} `;
		open_issues = yo`${milestone.open_issues} `;
		if ( close_issues == 0) {
			issues = 0;
		} else {
			issues = ((parseInt(close_issues,10) * 100) / parseInt(open_issues,10))
		}
		color = RandomColor();
		return yo`<div style="float:left;"> ${ModCuadro(title,ModCircle(RandomNumber(),color),color)} </div>`;
	})}</div>`
}
