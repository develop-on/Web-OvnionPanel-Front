var yo = require('yo-yo')
var ModCircle = require('./modulos/circle_bar/circle_bar.js')

function RandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

module.exports = function milestones ( state ) {
	return yo`<div>titulos<ul>${state.milestones.map(function (milestone) {
		close_issues = yo`${milestone.close_issues} `;
		open_issues = yo`${milestone.open_issues} `;
		if ( close_issues == 0) {
			issues = 0;
		} else {
			issues = ((parseInt(close_issues,10) * 100) / parseInt(open_issues,10))
		}
		return ModCircle(RandomColor(),30,'big');
	})}</ul></div>`
}
