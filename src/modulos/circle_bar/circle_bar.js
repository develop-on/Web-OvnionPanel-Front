var yo = require('yo-yo')
var style = require('./circle_bar_css.js')

module.exports = function circle_bar (colorx,progress,size) {
var styles = style(colorx)
var slice = styles['slice']  
var bar = styles['bar']
var fill = styles['fill']
var c100 = styles['c100'] +" "+styles['p'+progress] +" "+ styles[size] +" "+ styles['color'];
var progress = progress;


 return yo`<div>

                <div class="${c100}">
                    <span>${progress}</span>
                    <div class="${slice}">
                        <div class="${bar}"></div>
                        <div class="${fill}"></div>
                    </div>
                </div>
 </div>`	
}

