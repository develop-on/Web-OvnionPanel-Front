(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var document = require('global/document')
var hyperx = require('hyperx')

var SVGNS = 'http://www.w3.org/2000/svg'
var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  willvalidate: 1
}
var SVG_TAGS = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else {
    el = document.createElement(tag)
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          el.setAttributeNS(null, p, val)
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = document.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

module.exports = hyperx(belCreateElement)
module.exports.createElement = belCreateElement

},{"global/document":20,"hyperx":22}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
(function (global){
'use strict';

var csjs = require('csjs');
var insertCss = require('insert-css');

function csjsInserter() {
  var args = Array.prototype.slice.call(arguments);
  var result = csjs.apply(null, args);
  if (global.document) {
    insertCss(csjs.getCss(result));
  }
  return result;
}

module.exports = csjsInserter;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"csjs":9,"insert-css":23}],4:[function(require,module,exports){
'use strict';

module.exports = require('csjs/get-css');

},{"csjs/get-css":8}],5:[function(require,module,exports){
'use strict';

var csjs = require('./csjs');

module.exports = csjs;
module.exports.csjs = csjs;
module.exports.getCss = require('./get-css');

},{"./csjs":3,"./get-css":4}],6:[function(require,module,exports){
'use strict';

module.exports = require('csjs-inject');

},{"csjs-inject":5}],7:[function(require,module,exports){
'use strict';

module.exports = require('./lib/csjs');

},{"./lib/csjs":13}],8:[function(require,module,exports){
'use strict';

module.exports = require('./lib/get-css');

},{"./lib/get-css":16}],9:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"./csjs":7,"./get-css":8,"dup":5}],10:[function(require,module,exports){
'use strict';

/**
 * base62 encode implementation based on base62 module:
 * https://github.com/andrew/base62.js
 */

var CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports = function encode(integer) {
  if (integer === 0) {
    return '0';
  }
  var str = '';
  while (integer > 0) {
    str = CHARS[integer % 62] + str;
    integer = Math.floor(integer / 62);
  }
  return str;
};

},{}],11:[function(require,module,exports){
'use strict';

var makeComposition = require('./composition').makeComposition;

module.exports = function createExports(classes, keyframes, compositions) {
  var keyframesObj = Object.keys(keyframes).reduce(function(acc, key) {
    var val = keyframes[key];
    acc[val] = makeComposition([key], [val], true);
    return acc;
  }, {});

  var exports = Object.keys(classes).reduce(function(acc, key) {
    var val = classes[key];
    var composition = compositions[key];
    var extended = composition ? getClassChain(composition) : [];
    var allClasses = [key].concat(extended);
    var unscoped = allClasses.map(function(name) {
      return classes[name] ? classes[name] : name;
    });
    acc[val] = makeComposition(allClasses, unscoped);
    return acc;
  }, keyframesObj);

  return exports;
}

function getClassChain(obj) {
  var visited = {}, acc = [];

  function traverse(obj) {
    return Object.keys(obj).forEach(function(key) {
      if (!visited[key]) {
        visited[key] = true;
        acc.push(key);
        traverse(obj[key]);
      }
    });
  }

  traverse(obj);
  return acc;
}

},{"./composition":12}],12:[function(require,module,exports){
'use strict';

module.exports = {
  makeComposition: makeComposition,
  isComposition: isComposition
};

/**
 * Returns an immutable composition object containing the given class names
 * @param  {array} classNames - The input array of class names
 * @return {Composition}      - An immutable object that holds multiple
 *                              representations of the class composition
 */
function makeComposition(classNames, unscoped, isAnimation) {
  var classString = classNames.join(' ');
  return Object.create(Composition.prototype, {
    classNames: { // the original array of class names
      value: Object.freeze(classNames),
      configurable: false,
      writable: false,
      enumerable: true
    },
    unscoped: { // the original array of class names
      value: Object.freeze(unscoped),
      configurable: false,
      writable: false,
      enumerable: true
    },
    className: { // space-separated class string for use in HTML
      value: classString,
      configurable: false,
      writable: false,
      enumerable: true
    },
    selector: { // comma-separated, period-prefixed string for use in CSS
      value: classNames.map(function(name) {
        return isAnimation ? name : '.' + name;
      }).join(', '),
      configurable: false,
      writable: false,
      enumerable: true
    },
    toString: { // toString() method, returns class string for use in HTML
      value: function() {
        return classString;
      },
      configurable: false,
      writeable: false,
      enumerable: false
    }
  });
}

/**
 * Returns whether the input value is a Composition
 * @param value      - value to check
 * @return {boolean} - whether value is a Composition or not
 */
function isComposition(value) {
  return value instanceof Composition;
}

/**
 * Private constructor for use in `instanceof` checks
 */
function Composition() {}

},{}],13:[function(require,module,exports){
'use strict';

var extractExtends = require('./css-extract-extends');
var isComposition = require('./composition').isComposition;
var buildExports = require('./build-exports');
var scopify = require('./scopeify');
var cssKey = require('./css-key');

module.exports = function csjsHandler(strings) {
  // Fast path to prevent arguments deopt
  var values = Array(arguments.length - 1);
  for (var i = 1; i < arguments.length; i++) {
    values[i - 1] = arguments[i];
  }
  var css = joiner(strings, values.map(selectorize));

  var ignores = values.reduce(function(acc, val) {
    if (isComposition(val)) {
      val.classNames.forEach(function(name, i) {
        acc[name] = val.unscoped[i];
      });
    }
    return acc;
  }, {});

  var scoped = scopify(css, ignores);
  var hashes = Object.assign({}, scoped.classes, scoped.keyframes);
  var extracted = extractExtends(scoped.css, hashes);

  var localClasses = without(scoped.classes, ignores);
  var localKeyframes = without(scoped.keyframes, ignores);
  var compositions = extracted.compositions;

  var exports = buildExports(localClasses, localKeyframes, compositions);

  return Object.defineProperty(exports, cssKey, {
    enumerable: false,
    configurable: false,
    writeable: false,
    value: extracted.css
  });
};

/**
 * Replaces class compositions with comma seperated class selectors
 * @param  value - the potential class composition
 * @return       - the original value or the selectorized class composition
 */
function selectorize(value) {
  return isComposition(value) ? value.selector : value;
}

/**
 * Joins template string literals and values
 * @param  {array} strings - array of strings
 * @param  {array} values  - array of values
 * @return {string}        - strings and values joined
 */
function joiner(strings, values) {
  return strings.map(function(str, i) {
    return (i !== values.length) ? str + values[i] : str;
  }).join('');
}

/**
 * Returns first object without keys of second
 * @param  {object} obj      - source object
 * @param  {object} unwanted - object with unwanted keys
 * @return {object}          - first object without unwanted keys
 */
function without(obj, unwanted) {
  return Object.keys(obj).reduce(function(acc, key) {
    if (!unwanted[key]) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

},{"./build-exports":11,"./composition":12,"./css-extract-extends":14,"./css-key":15,"./scopeify":19}],14:[function(require,module,exports){
'use strict';

var makeComposition = require('./composition').makeComposition;

var regex = /\.([^\s]+)(\s+)(extends\s+)((?:\.[^{]+))/g;

module.exports = function extractExtends(css, hashed) {
  var found, matches = [];
  while (found = regex.exec(css)) {
    matches.unshift(found);
  }

  function extractCompositions(acc, match) {
    var extendee = getClassName(match[1]);
    var keyword = match[3];
    var extended = match[4];

    // remove from output css
    var index = match.index + match[1].length + match[2].length;
    var len = keyword.length + extended.length;
    acc.css = acc.css.slice(0, index) + acc.css.slice(index + len);
    
    var extendedClasses = splitter(extended);

    extendedClasses.forEach(function(className) {
      if (!acc.compositions[extendee]) {
        acc.compositions[extendee] = {};
      }
      if (!acc.compositions[className]) {
        acc.compositions[className] = {};
      }
      acc.compositions[extendee][className] = acc.compositions[className];
    });
    return acc;
  }

  return matches.reduce(extractCompositions, {
    css: css,
    compositions: {}
  });

};

function splitter(match) {
  return match.split(',').map(getClassName);
}

function getClassName(str) {
  var trimmed = str.trim();
  return trimmed[0] === '.' ? trimmed.substr(1) : trimmed;
}

},{"./composition":12}],15:[function(require,module,exports){
'use strict';

/**
 * CSS identifiers with whitespace are invalid
 * Hence this key will not cause a collision
 */

module.exports = ' css ';

},{}],16:[function(require,module,exports){
'use strict';

var cssKey = require('./css-key');

module.exports = function getCss(csjs) {
  return csjs[cssKey];
};

},{"./css-key":15}],17:[function(require,module,exports){
'use strict';

/**
 * djb2 string hash implementation based on string-hash module:
 * https://github.com/darkskyapp/string-hash
 */

module.exports = function hashStr(str) {
  var hash = 5381;
  var i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return hash >>> 0;
};

},{}],18:[function(require,module,exports){
'use strict';

var encode = require('./base62-encode');
var hash = require('./hash-string');

module.exports = function fileScoper(fileSrc) {
  var suffix = encode(hash(fileSrc));

  return function scopedName(name) {
    return name + '_' + suffix;
  }
};

},{"./base62-encode":10,"./hash-string":17}],19:[function(require,module,exports){
'use strict';

var fileScoper = require('./scoped-name');

var findClasses = /(\.)(?!\d)([^\s\.,{\[>+~#:]*)(?![^{]*})/.source;
var findKeyframes = /(@\S*keyframes\s*)([^{\s]*)/.source;
var ignoreComments = /(?!(?:[^*/]|\*[^/]|\/[^*])*\*+\/)/.source;

var classRegex = new RegExp(findClasses + ignoreComments, 'g');
var keyframesRegex = new RegExp(findKeyframes + ignoreComments, 'g');

module.exports = scopify;

function scopify(css, ignores) {
  var makeScopedName = fileScoper(css);
  var replacers = {
    classes: classRegex,
    keyframes: keyframesRegex
  };

  function scopeCss(result, key) {
    var replacer = replacers[key];
    function replaceFn(fullMatch, prefix, name) {
      var scopedName = ignores[name] ? name : makeScopedName(name);
      result[key][scopedName] = name;
      return prefix + scopedName;
    }
    return {
      css: result.css.replace(replacer, replaceFn),
      keyframes: result.keyframes,
      classes: result.classes
    };
  }

  var result = Object.keys(replacers).reduce(scopeCss, {
    css: css,
    keyframes: {},
    classes: {}
  });

  return replaceAnimations(result);
}

function replaceAnimations(result) {
  var animations = Object.keys(result.keyframes).reduce(function(acc, key) {
    acc[result.keyframes[key]] = key;
    return acc;
  }, {});
  var unscoped = Object.keys(animations);

  if (unscoped.length) {
    var regexStr = '((?:animation|animation-name)\\s*:[^};]*)('
      + unscoped.join('|') + ')([;\\s])' + ignoreComments;
    var regex = new RegExp(regexStr, 'g');

    var replaced = result.css.replace(regex, function(match, preamble, name, ending) {
      return preamble + animations[name] + ending;
    });

    return {
      css: replaced,
      keyframes: result.keyframes,
      classes: result.classes
    }
  }

  return result;
}

},{"./scoped-name":18}],20:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":2}],21:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],22:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12

module.exports = function (h, opts) {
  h = attrToProp(h)
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        p.push([ VAR, xstate, arg ])
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else cur[1][key] = concat(cur[1][key], parts[i][1])
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else cur[1][key] = concat(cur[1][key], parts[i][2])
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state)) {
          if (state === OPEN) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === TEXT) {
          reg += c
        } else if (state === OPEN && /\s/.test(c)) {
          res.push([OPEN, reg])
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[\w-]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_BREAK],[ATTR_VALUE,reg])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":21}],23:[function(require,module,exports){
var inserted = {};

module.exports = function (css, options) {
    if (inserted[css]) return;
    inserted[css] = true;
    
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }
    
    var head = document.getElementsByTagName('head')[0];
    if (options && options.prepend) {
        head.insertBefore(elem, head.childNodes[0]);
    } else {
        head.appendChild(elem);
    }
};

},{}],24:[function(require,module,exports){
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isObject = require('isobject');

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;
  
  if (isObjectObject(o) === false) return false;
  
  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;
  
  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;
  
  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }
  
  // Most likely a plain Object
  return true;
};

},{"isobject":25}],25:[function(require,module,exports){
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function isObject(val) {
  return val != null && typeof val === 'object'
    && !Array.isArray(val);
};

},{}],26:[function(require,module,exports){
function isHTMLElement(obj) {
    return obj && (typeof obj === 'object') &&
      (obj.nodeType === 1) && (typeof obj.style === 'object') &&
      (typeof obj.ownerDocument ==='object');
}

function isA(obj) {
    return isHTMLElement(obj) && obj.tagName === 'A';
}

function closestA(checkNode) {
    do {
        if (isA(checkNode)) {
            return checkNode;
        }
    } while ((checkNode = checkNode.parentNode));
}

function normalizeLeadingSlash(pathname) {
    if (pathname.charAt(0) !== '/') {
        pathname = '/' + pathname;
    }
    return pathname;
}

function isSecondaryButton(event) {
    return (typeof event === 'object') && ('button' in event) && event.button !== 0;
}

// [1] http://blogs.msdn.com/b/ieinternals/archive/2011/02/28/internet-explorer-window-location-pathname-missing-slash-and-host-has-port.aspx
// [2] https://github.com/substack/catch-links/blob/7aee219cdc2c845c78caad6070886a9380b90e4c/index.js#L13-L17
// [3] IE10 (and possibly later) report that anchor.port is the default port
//     but dont append it to the hostname, so if the host doesnt end with the port
//     append it to the anchor host as well

function isLocal(event, anchor, lookForHash) {
    event || (event = {});

    // Skip modifier events
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return null;
    }

    // Skip non-primary clicks
    if (isSecondaryButton(event)) {
        return null;
    }

    // If we have an anchor but its not an A tag
    // try to find the closest one
    if (anchor && !isA(anchor)) {
        anchor = closestA(anchor);
    }

    // Only test anchor elements
    if (!anchor || !isA(anchor)) {
        return null;
    }

    // Dont test anchors with target=_blank
    if (anchor.target === '_blank') {
        return null;
    }

    // IE9 doesn't put a leading slash on anchor.pathname [1]
    var aPathname = normalizeLeadingSlash(anchor.pathname);
    var wPathname = normalizeLeadingSlash(window.location.pathname);
    var aHost = anchor.host;
    var aPort = anchor.port;
    var wHost = window.location.host;
    var wPort = window.location.port;

    // Some browsers (Chrome 36) return an empty string for anchor.hash
    // even when href="#", so we also check the href
    var aHash = anchor.hash || (anchor.href.indexOf('#') > -1 ? '#' + anchor.href.split('#')[1] : null);
    var inPageHash;

    // Window has no port, but anchor has the default port
    if (!wPort && aPort && (aPort === '80' || aPort === '443')) {
        // IE9 sometimes includes the default port (80 or 443) on anchor.host
        // so we append the default port to the window host in this case
        // so they will match for the host equality check [1]
        wHost += ':' + aPort;
        aHost += aHost.indexOf(aPort, aHost.length - aPort.length) === -1 ? ':' + aPort : ''; // [3]
    }

    // Hosts are the same, its a local link
    if (aHost === wHost) {

        // If everything else is the same
        // and hash exists, then it is an in-page hash [2]
        inPageHash =
            aPathname === wPathname &&
            anchor.search === window.location.search &&
            aHash;

        if (lookForHash === true) {
            // If we are looking for the hash then this will
            // only return a truthy value if the link
            // is an *in-page* hash link
            return inPageHash;
        } else {
            // If this is an in page hash link
            // then ignore it because we werent looking for hash links
            return inPageHash ?
                null :
                aPathname + (anchor.search || '') + (aHash || '');
        }
    }

    return null;
}

// Take two arguments and return an ordered array of [event, anchor]
function getEventAndAnchor(arg1, arg2) {
    var ev = null;
    var anchor = null;

    // Two arguments will come in this order
    if (arguments.length === 2) {
        ev = arg1;
        anchor = arg2;
    }
    // If our first arg is an element
    // then use that as our anchor
    else if (isHTMLElement(arg1)) {
        anchor = arg1;
    }
    // Otherwise our argument is an event
    else {
        ev = arg1;
    }

    // If there is no anchor, but we have an event
    // then use event.target
    if (!anchor && ev && ev.target) {
        anchor = ev.target;
    }

    // Return an array so that it can be used with Function.apply
    return [ev, anchor];
}


// Functions to be used in exports. Defined here for alias purposes
function pathname() {
    return isLocal.apply(null, getEventAndAnchor.apply(null, arguments));
}

function hash() {
    return isLocal.apply(null, getEventAndAnchor.apply(null, arguments).concat(true));
}

function active() {
    var args = Array.prototype.slice.call(arguments);
    var last = args[args.length - 1];
    var checkPath = window.location.pathname;

    if (typeof last === 'string') {
        checkPath = last;
        args = args.slice(0, -1);
    }

    return pathname.apply(null, args) === normalizeLeadingSlash(checkPath);
}

module.exports = {
    isLocal: isLocal,
    pathname: pathname,
    getLocalPathname: pathname,
    hash: hash,
    getLocalHash: hash,
    active: active,
    isActive: active
};

},{}],27:[function(require,module,exports){
// Create a range object for efficently rendering strings to elements.
var range;

var testEl = typeof document !== 'undefined' ? document.body || document.createElement('div') : {};

// Fixes https://github.com/patrick-steele-idem/morphdom/issues/32 (IE7+ support)
// <=IE7 does not support el.hasAttribute(name)
var hasAttribute;
if (testEl.hasAttribute) {
    hasAttribute = function hasAttribute(el, name) {
        return el.hasAttribute(name);
    };
} else {
    hasAttribute = function hasAttribute(el, name) {
        return el.getAttributeNode(name);
    };
}

function empty(o) {
    for (var k in o) {
        if (o.hasOwnProperty(k)) {
            return false;
        }
    }

    return true;
}
function toElement(str) {
    if (!range && document.createRange) {
        range = document.createRange();
        range.selectNode(document.body);
    }

    var fragment;
    if (range && range.createContextualFragment) {
        fragment = range.createContextualFragment(str);
    } else {
        fragment = document.createElement('body');
        fragment.innerHTML = str;
    }
    return fragment.childNodes[0];
}

var specialElHandlers = {
    /**
     * Needed for IE. Apparently IE doesn't think
     * that "selected" is an attribute when reading
     * over the attributes using selectEl.attributes
     */
    OPTION: function(fromEl, toEl) {
        if ((fromEl.selected = toEl.selected)) {
            fromEl.setAttribute('selected', '');
        } else {
            fromEl.removeAttribute('selected', '');
        }
    },
    /**
     * The "value" attribute is special for the <input> element
     * since it sets the initial value. Changing the "value"
     * attribute without changing the "value" property will have
     * no effect since it is only used to the set the initial value.
     * Similar for the "checked" attribute.
     */
    INPUT: function(fromEl, toEl) {
        fromEl.checked = toEl.checked;

        if (fromEl.value != toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!hasAttribute(toEl, 'checked')) {
            fromEl.removeAttribute('checked');
        }

        if (!hasAttribute(toEl, 'value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value != newValue) {
            fromEl.value = newValue;
        }

        if (fromEl.firstChild) {
            fromEl.firstChild.nodeValue = newValue;
        }
    }
};

function noop() {}

/**
 * Loop over all of the attributes on the target node and make sure the
 * original DOM node has the same attributes. If an attribute
 * found on the original node is not on the new node then remove it from
 * the original node
 * @param  {HTMLElement} fromNode
 * @param  {HTMLElement} toNode
 */
function morphAttrs(fromNode, toNode) {
    var attrs = toNode.attributes;
    var i;
    var attr;
    var attrName;
    var attrValue;
    var foundAttrs = {};

    for (i=attrs.length-1; i>=0; i--) {
        attr = attrs[i];
        if (attr.specified !== false) {
            attrName = attr.name;
            attrValue = attr.value;
            foundAttrs[attrName] = true;

            if (fromNode.getAttribute(attrName) !== attrValue) {
                fromNode.setAttribute(attrName, attrValue);
            }
        }
    }

    // Delete any extra attributes found on the original DOM element that weren't
    // found on the target element.
    attrs = fromNode.attributes;

    for (i=attrs.length-1; i>=0; i--) {
        attr = attrs[i];
        if (attr.specified !== false) {
            attrName = attr.name;
            if (!foundAttrs.hasOwnProperty(attrName)) {
                fromNode.removeAttribute(attrName);
            }
        }
    }
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while(curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function defaultGetNodeKey(node) {
    return node.id;
}

function morphdom(fromNode, toNode, options) {
    if (!options) {
        options = {};
    }

    if (typeof toNode === 'string') {
        if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
            var toNodeHtml = toNode;
            toNode = document.createElement('html');
            toNode.innerHTML = toNodeHtml;
        } else {
            toNode = toElement(toNode);
        }
    }

    var savedEls = {}; // Used to save off DOM elements with IDs
    var unmatchedEls = {};
    var getNodeKey = options.getNodeKey || defaultGetNodeKey;
    var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
    var onNodeAdded = options.onNodeAdded || noop;
    var onBeforeElUpdated = options.onBeforeElUpdated || options.onBeforeMorphEl || noop;
    var onElUpdated = options.onElUpdated || noop;
    var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
    var onNodeDiscarded = options.onNodeDiscarded || noop;
    var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || options.onBeforeMorphElChildren || noop;
    var childrenOnly = options.childrenOnly === true;
    var movedEls = [];

    function removeNodeHelper(node, nestedInSavedEl) {
        var id = getNodeKey(node);
        // If the node has an ID then save it off since we will want
        // to reuse it in case the target DOM tree has a DOM element
        // with the same ID
        if (id) {
            savedEls[id] = node;
        } else if (!nestedInSavedEl) {
            // If we are not nested in a saved element then we know that this node has been
            // completely discarded and will not exist in the final DOM.
            onNodeDiscarded(node);
        }

        if (node.nodeType === 1) {
            var curChild = node.firstChild;
            while(curChild) {
                removeNodeHelper(curChild, nestedInSavedEl || id);
                curChild = curChild.nextSibling;
            }
        }
    }

    function walkDiscardedChildNodes(node) {
        if (node.nodeType === 1) {
            var curChild = node.firstChild;
            while(curChild) {


                if (!getNodeKey(curChild)) {
                    // We only want to handle nodes that don't have an ID to avoid double
                    // walking the same saved element.

                    onNodeDiscarded(curChild);

                    // Walk recursively
                    walkDiscardedChildNodes(curChild);
                }

                curChild = curChild.nextSibling;
            }
        }
    }

    function removeNode(node, parentNode, alreadyVisited) {
        if (onBeforeNodeDiscarded(node) === false) {
            return;
        }

        parentNode.removeChild(node);
        if (alreadyVisited) {
            if (!getNodeKey(node)) {
                onNodeDiscarded(node);
                walkDiscardedChildNodes(node);
            }
        } else {
            removeNodeHelper(node);
        }
    }

    function morphEl(fromEl, toEl, alreadyVisited, childrenOnly) {
        var toElKey = getNodeKey(toEl);
        if (toElKey) {
            // If an element with an ID is being morphed then it is will be in the final
            // DOM so clear it out of the saved elements collection
            delete savedEls[toElKey];
        }

        if (!childrenOnly) {
            if (onBeforeElUpdated(fromEl, toEl) === false) {
                return;
            }

            morphAttrs(fromEl, toEl);
            onElUpdated(fromEl);

            if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                return;
            }
        }

        if (fromEl.tagName != 'TEXTAREA') {
            var curToNodeChild = toEl.firstChild;
            var curFromNodeChild = fromEl.firstChild;
            var curToNodeId;

            var fromNextSibling;
            var toNextSibling;
            var savedEl;
            var unmatchedEl;

            outer: while(curToNodeChild) {
                toNextSibling = curToNodeChild.nextSibling;
                curToNodeId = getNodeKey(curToNodeChild);

                while(curFromNodeChild) {
                    var curFromNodeId = getNodeKey(curFromNodeChild);
                    fromNextSibling = curFromNodeChild.nextSibling;

                    if (!alreadyVisited) {
                        if (curFromNodeId && (unmatchedEl = unmatchedEls[curFromNodeId])) {
                            unmatchedEl.parentNode.replaceChild(curFromNodeChild, unmatchedEl);
                            morphEl(curFromNodeChild, unmatchedEl, alreadyVisited);
                            curFromNodeChild = fromNextSibling;
                            continue;
                        }
                    }

                    var curFromNodeType = curFromNodeChild.nodeType;

                    if (curFromNodeType === curToNodeChild.nodeType) {
                        var isCompatible = false;

                        if (curFromNodeType === 1) { // Both nodes being compared are Element nodes
                            if (curFromNodeChild.tagName === curToNodeChild.tagName) {
                                // We have compatible DOM elements
                                if (curFromNodeId || curToNodeId) {
                                    // If either DOM element has an ID then we handle
                                    // those differently since we want to match up
                                    // by ID
                                    if (curToNodeId === curFromNodeId) {
                                        isCompatible = true;
                                    }
                                } else {
                                    isCompatible = true;
                                }
                            }

                            if (isCompatible) {
                                // We found compatible DOM elements so transform the current "from" node
                                // to match the current target DOM node.
                                morphEl(curFromNodeChild, curToNodeChild, alreadyVisited);
                            }
                        } else if (curFromNodeType === 3) { // Both nodes being compared are Text nodes
                            isCompatible = true;
                            // Simply update nodeValue on the original node to change the text value
                            curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                        }

                        if (isCompatible) {
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }
                    }

                    // No compatible match so remove the old node from the DOM and continue trying
                    // to find a match in the original DOM
                    removeNode(curFromNodeChild, fromEl, alreadyVisited);
                    curFromNodeChild = fromNextSibling;
                }

                if (curToNodeId) {
                    if ((savedEl = savedEls[curToNodeId])) {
                        morphEl(savedEl, curToNodeChild, true);
                        curToNodeChild = savedEl; // We want to append the saved element instead
                    } else {
                        // The current DOM element in the target tree has an ID
                        // but we did not find a match in any of the corresponding
                        // siblings. We just put the target element in the old DOM tree
                        // but if we later find an element in the old DOM tree that has
                        // a matching ID then we will replace the target element
                        // with the corresponding old element and morph the old element
                        unmatchedEls[curToNodeId] = curToNodeChild;
                    }
                }

                // If we got this far then we did not find a candidate match for our "to node"
                // and we exhausted all of the children "from" nodes. Therefore, we will just
                // append the current "to node" to the end
                if (onBeforeNodeAdded(curToNodeChild) !== false) {
                    fromEl.appendChild(curToNodeChild);
                    onNodeAdded(curToNodeChild);
                }

                if (curToNodeChild.nodeType === 1 && (curToNodeId || curToNodeChild.firstChild)) {
                    // The element that was just added to the original DOM may have
                    // some nested elements with a key/ID that needs to be matched up
                    // with other elements. We'll add the element to a list so that we
                    // can later process the nested elements if there are any unmatched
                    // keyed elements that were discarded
                    movedEls.push(curToNodeChild);
                }

                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
            }

            // We have processed all of the "to nodes". If curFromNodeChild is non-null then
            // we still have some from nodes left over that need to be removed
            while(curFromNodeChild) {
                fromNextSibling = curFromNodeChild.nextSibling;
                removeNode(curFromNodeChild, fromEl, alreadyVisited);
                curFromNodeChild = fromNextSibling;
            }
        }

        var specialElHandler = specialElHandlers[fromEl.tagName];
        if (specialElHandler) {
            specialElHandler(fromEl, toEl);
        }
    } // END: morphEl(...)

    var morphedNode = fromNode;
    var morphedNodeType = morphedNode.nodeType;
    var toNodeType = toNode.nodeType;

    if (!childrenOnly) {
        // Handle the case where we are given two DOM nodes that are not
        // compatible (e.g. <div> --> <span> or <div> --> TEXT)
        if (morphedNodeType === 1) {
            if (toNodeType === 1) {
                if (fromNode.tagName !== toNode.tagName) {
                    onNodeDiscarded(fromNode);
                    morphedNode = moveChildren(fromNode, document.createElement(toNode.tagName));
                }
            } else {
                // Going from an element node to a text node
                morphedNode = toNode;
            }
        } else if (morphedNodeType === 3) { // Text node
            if (toNodeType === 3) {
                morphedNode.nodeValue = toNode.nodeValue;
                return morphedNode;
            } else {
                // Text node to something else
                morphedNode = toNode;
            }
        }
    }

    if (morphedNode === toNode) {
        // The "to node" was not compatible with the "from node"
        // so we had to toss out the "from node" and use the "to node"
        onNodeDiscarded(fromNode);
    } else {
        morphEl(morphedNode, toNode, false, childrenOnly);

        /**
         * What we will do here is walk the tree for the DOM element
         * that was moved from the target DOM tree to the original
         * DOM tree and we will look for keyed elements that could
         * be matched to keyed elements that were earlier discarded.
         * If we find a match then we will move the saved element
         * into the final DOM tree
         */
        var handleMovedEl = function(el) {
            var curChild = el.firstChild;
            while(curChild) {
                var nextSibling = curChild.nextSibling;

                var key = getNodeKey(curChild);
                if (key) {
                    var savedEl = savedEls[key];
                    if (savedEl && (curChild.tagName === savedEl.tagName)) {
                        curChild.parentNode.replaceChild(savedEl, curChild);
                        morphEl(savedEl, curChild, true /* already visited the saved el tree */);
                        curChild = nextSibling;
                        if (empty(savedEls)) {
                            return false;
                        }
                        continue;
                    }
                }

                if (curChild.nodeType === 1) {
                    handleMovedEl(curChild);
                }

                curChild = nextSibling;
            }
        };

        // The loop below is used to possibly match up any discarded
        // elements in the original DOM tree with elemenets from the
        // target tree that were moved over without visiting their
        // children
        if (!empty(savedEls)) {
            handleMovedElsLoop:
            while (movedEls.length) {
                var movedElsTemp = movedEls;
                movedEls = [];
                for (var i=0; i<movedElsTemp.length; i++) {
                    if (handleMovedEl(movedElsTemp[i]) === false) {
                        // There are no more unmatched elements so completely end
                        // the loop
                        break handleMovedElsLoop;
                    }
                }
            }
        }

        // Fire the "onNodeDiscarded" event for any saved elements
        // that never found a new home in the morphed DOM
        for (var savedElId in savedEls) {
            if (savedEls.hasOwnProperty(savedElId)) {
                var savedEl = savedEls[savedElId];
                onNodeDiscarded(savedEl);
                walkDiscardedChildNodes(savedEl);
            }
        }
    }

    if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        // If we had to swap out the from node with a new node because the old
        // node was not compatible with the target node then we need to
        // replace the old DOM node in the original DOM tree. This is only
        // possible if the original DOM node was part of a DOM tree which
        // we know is the case if it has a parent node.
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
    }

    return morphedNode;
}

module.exports = morphdom;

},{}],28:[function(require,module,exports){
/**
* Create an event emitter with namespaces
* @name createNamespaceEmitter
* @example
* var emitter = require('./index')()
*
* emitter.on('*', function () {
*   console.log('all events emitted', this.event)
* })
*
* emitter.on('example', function () {
*   console.log('example event emitted')
* })
*/
module.exports = function createNamespaceEmitter () {
  var emitter = { _fns: {} }

  /**
  * Emit an event. Optionally namespace the event. Separate the namespace and event with a `:`
  * @name emit
  * @param {String} event – the name of the event, with optional namespace
  * @param {...*} data – data variables that will be passed as arguments to the event listener
  * @example
  * emitter.emit('example')
  * emitter.emit('demo:test')
  * emitter.emit('data', { example: true}, 'a string', 1)
  */
  emitter.emit = function emit (event) {
    var args = [].slice.call(arguments, 1)
    var namespaced = namespaces(event)
    if (this._fns[event]) emitAll(event, this._fns[event], args)
    if (namespaced) emitAll(event, namespaced, args)
  }

  /**
  * Create en event listener.
  * @name on
  * @param {String} event
  * @param {Function} fn
  * @example
  * emitter.on('example', function () {})
  * emitter.on('demo', function () {})
  */
  emitter.on = function on (event, fn) {
    if (typeof fn !== 'function') { throw new Error('callback required') }
    (this._fns[event] = this._fns[event] || []).push(fn)
  }

  /**
  * Create en event listener that fires once.
  * @name once
  * @param {String} event
  * @param {Function} fn
  * @example
  * emitter.once('example', function () {})
  * emitter.once('demo', function () {})
  */
  emitter.once = function once (event, fn) {
    function one () {
      fn.apply(this, arguments)
      emitter.off(event, one)
    }
    this.on(event, one)
  }

  /**
  * Stop listening to an event. Stop all listeners on an event by only passing the event name. Stop a single listener by passing that event handler as a callback.
  * You must be explicit about what will be unsubscribed: `emitter.off('demo')` will unsubscribe an `emitter.on('demo')` listener, 
  * `emitter.off('demo:example')` will unsubscribe an `emitter.on('demo:example')` listener
  * @name off
  * @param {String} event
  * @param {Function} [fn] – the specific handler
  * @example
  * emitter.off('example')
  * emitter.off('demo', function () {})
  */
  emitter.off = function off (event, fn) {
    var keep = []

    if (event && fn) {
      for (var i = 0; i < this._fns.length; i++) {
        if (this._fns[i] !== fn) {
          keep.push(this._fns[i])
        }
      }
    }

    keep.length ? this._fns[event] = keep : delete this._fns[event]
  }

  function namespaces (e) {
    var out = []
    var args = e.split(':')
    var fns = emitter._fns
    Object.keys(fns).forEach(function (key) {
      if (key === '*') out = out.concat(fns[key])
      if (args.length === 2 && args[0] === key) out = out.concat(fns[key])
    })
    return out
  }

  function emitAll (e, fns, args) {
    for (var i = 0; i < fns.length; i++) {
      if (!fns[i]) break
      fns[i].event = e
      fns[i].apply(fns[i], args)
    }
  }

  return emitter
}

},{}],29:[function(require,module,exports){
var createEmitter = require('namespace-emitter')
var isPlainObject = require('is-plain-object')
var extend = require('xtend')

/**
* Create the store
* @name createStoreEmitter
* @param {function} modifier
* @param {object} [initialState]
* @example
* var createStore = require('store-emitter')
* var store = createStore(function (action, state) {
*   if (action.type === 'change_something') {
*     return { something: 'changed' }
*   }
* })
*/
module.exports = function createStore (modifier, initialState) {
  if (typeof modifier !== 'function') {
    throw new Error('first argument must be a function')
  }

  var emitter = createEmitter()
  initialState = initialState || {}
  var isEmitting = false
  var state = extend(initialState)
  store.initialState = getInitialState
  store.getState = getState
  store.emit = store
  store.on = on
  store.once = once
  store.off = off
  return store

  /**
  * Send an action to the store. Takes a single object parameter. Object must include a `type` property with a string value, and can contain any other properties.
  * @name store
  * @param {object} action
  * @param {string} action.type
  * @example
  * store({
  *   type: 'example'
  *   exampleValue: 'anything'
  * })
  */
  function store (action) {
    if (!action || !isPlainObject(action)) {
      throw new Error('action parameter is required and must be a plain object')
    }

    if (!action.type || typeof action.type !== 'string') {
      throw new Error('type property of action is required and must be a string')
    }

    if (isEmitting) {
      throw new Error('modifiers may not emit actions')
    }

    isEmitting = true
    var oldState = extend(state)
    state = modifier(action, oldState)
    var newState = extend(state)

    emitter.emit(action.type, action, newState, oldState)
    isEmitting = false
  }

  /**
  * Get the initial state of the store
  * @name store.initialState
  * @example
  * var state = store.initialState()
  */
  function getInitialState () {
    return initialState
  }

  /**
   * Get the current state of the store
   * @name store.getState
   * @example
   * var state = store.getState()
   */
  function getState () {
    return state
  }

  /**
  * Listen for changes to the store
  * @name store.on
  * @param {string} event – an action type
  * @param {Function} callback
  * @example
  * store.on('*', function (action, state, oldState) {
  *
  * })
  *
  * store.on('article', function (action, state, oldState) {
  *
  * })
  *
  * store.on('article:delete', function (action, state, oldState) {
  *
  * })
  */
  function on (event, callback) {
    emitter.on(event, callback)
  }

  /**
  * Listen for a single change to the store
  * @name store.once
  * @param {string} event – an action type
  * @param {Function} callback
  * @example
  * store.once('article', function (action, state, oldState) {
  *
  * })
  */
  function once (event, callback) {
    emitter.once(event, callback)
  }

  /**
  * Stop listening for changes to the store. Passing just the action type will remove all listeners for that action type.
  * @name store.off
  * @param {string} event – an action type
  * @param {Function} [callback] – optional callback
  * @example
  * store.off('article', function (action, state, oldState) {
  *
  * })
  */
  function off (event, callback) {
    emitter.off(event, callback)
  }
}

},{"is-plain-object":24,"namespace-emitter":28,"xtend":31}],30:[function(require,module,exports){
var bundleFn = arguments[3];
var sources = arguments[4];
var cache = arguments[5];

var stringify = JSON.stringify;

module.exports = function (fn, options) {
    var wkey;
    var cacheKeys = Object.keys(cache);

    for (var i = 0, l = cacheKeys.length; i < l; i++) {
        var key = cacheKeys[i];
        var exp = cache[key].exports;
        // Using babel as a transpiler to use esmodule, the export will always
        // be an object with the default export as a property of it. To ensure
        // the existing api and babel esmodule exports are both supported we
        // check for both
        if (exp === fn || exp && exp.default === fn) {
            wkey = key;
            break;
        }
    }

    if (!wkey) {
        wkey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
        var wcache = {};
        for (var i = 0, l = cacheKeys.length; i < l; i++) {
            var key = cacheKeys[i];
            wcache[key] = key;
        }
        sources[wkey] = [
            Function(['require','module','exports'], '(' + fn + ')(self)'),
            wcache
        ];
    }
    var skey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);

    var scache = {}; scache[wkey] = wkey;
    sources[skey] = [
        Function(['require'], (
            // try to call default if defined to also support babel esmodule
            // exports
            'var f = require(' + stringify(wkey) + ');' +
            '(f.default ? f.default : f)(self);'
        )),
        scache
    ];

    var src = '(' + bundleFn + ')({'
        + Object.keys(sources).map(function (key) {
            return stringify(key) + ':['
                + sources[key][0]
                + ',' + stringify(sources[key][1]) + ']'
            ;
        }).join(',')
        + '},{},[' + stringify(skey) + '])'
    ;

    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    var blob = new Blob([src], { type: 'text/javascript' });
    if (options && options.bare) { return blob; }
    var workerUrl = URL.createObjectURL(blob);
    var worker = new Worker(workerUrl);
    if (typeof URL.revokeObjectURL == "function") {
      URL.revokeObjectURL(workerUrl);
    }
    return worker;
};

},{}],31:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],32:[function(require,module,exports){
var bel = require('bel') // turns template tag into DOM elements
var morphdom = require('morphdom') // efficiently diffs + morphs two DOM elements
var defaultEvents = require('./update-events.js') // default events to be copied when dom elements update

module.exports = bel

// TODO move this + defaultEvents to a new module once we receive more feedback
module.exports.update = function (fromNode, toNode, opts) {
  if (!opts) opts = {}
  if (opts.events !== false) {
    if (!opts.onBeforeMorphEl) opts.onBeforeMorphEl = copier
  }

  return morphdom(fromNode, toNode, opts)

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier (f, t) {
    // copy events:
    var events = opts.events || defaultEvents
    for (var i = 0; i < events.length; i++) {
      var ev = events[i]
      if (t[ev]) { // if new element has a whitelisted attribute
        f[ev] = t[ev] // update existing element
      } else if (f[ev]) { // if existing element has it and new one doesnt
        f[ev] = undefined // remove it from existing element
      }
    }
    // copy values for form elements
    if (f.nodeName === 'INPUT' || f.nodeName === 'TEXTAREA' || f.nodeNAME === 'SELECT') {
      if (t.getAttribute('value') === null) t.value = f.value
    }
  }
}

},{"./update-events.js":33,"bel":1,"morphdom":27}],33:[function(require,module,exports){
module.exports = [
  // attribute events (can be set with attributes)
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oninput',
  // other common events
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
]

},{}],34:[function(require,module,exports){
var login = require('./modulos/login/login.js')
var panel = require('./panel.js')
var yo = require('yo-yo')

module.exports = function (state) {
  if (state.url === '/') return (function () {
          function appendChild (el, childs) {
            for (var i = 0; i < childs.length; i++) {
              var node = childs[i];
              if (Array.isArray(node)) {
                appendChild(el, node)
                continue
              }
              if (typeof node === "number" ||
                typeof node === "boolean" ||
                node instanceof Date ||
                node instanceof RegExp) {
                node = node.toString()
              }

              if (typeof node === "string") {
                if (el.lastChild && el.lastChild.nodeName === "#text") {
                  el.lastChild.nodeValue += node
                  continue
                }
                node = document.createTextNode(node)
              }

              if (node && node.nodeType) {
                el.appendChild(node)
              }
            }
          }
          var bel2 = document.createElement("div")
var bel0 = document.createElement("a")
bel0.setAttribute("href", "/login")
appendChild(bel0, ["login"])
var bel1 = document.createElement("a")
bel1.setAttribute("href", "/panel")
appendChild(bel1, ["panel"])
appendChild(bel2, [bel0," ",bel1])
          return bel2
        }())
  else if (state.url === '/login') return login(state)
  else if (state.url === '/panel') return panel(state)
  else return undefined
}

},{"./modulos/login/login.js":38,"./panel.js":40,"yo-yo":32}],35:[function(require,module,exports){
/* Trabajamos el worker mediante webworkify. Esto resulta mas natural que compilar el worker aparte y llamarlo desde index.html. */
var work = require('webworkify')
var worker = work(require('./worker.js'))
var yo = require('yo-yo')

/* app, es nuestra vista principal. Contiene ademas la logica para elegir la vista en funcion de la url en el estado. */
var app = require('./app.js')

/* Permite identificar los links locales facilmente y sin lidiar con diferencias entre navegadores. */
var localLinks = require('local-links')

/* El elemento base sobre el que vamos a correr yo.update */
var el = document.getElementById('content')

/* Por cada evento que recibimos del woker verificamos si existe el elemento base el.
   Si no existe, vaciamos el body y lo inicializamos.
   Si existe, ya podemos correr yo.update.
*/
worker.onmessage = function (ev) {
    var newel = app(ev.data)
    var url = ev.data.url
  // if (!el) {
  //       el = newel
  //   document.body.innerHTML = ''
  //   return document.body.appendChild(el)
  // }
  yo.update(el, newel)
  if (
      'classList' in document.documentElement &&
      'querySelector' in document &&
      'addEventListener' in window &&
      'forEach' in Array.prototype) {
    document.documentElement.classList.add('mdl-js');
    componentHandler.upgradeAllRegistered();
  } else {
    /**
     * Dummy function to avoid JS errors.
     */
    componentHandler.upgradeElement = function() {};
    /**
     * Dummy function to avoid JS errors.
     */
    componentHandler.register = function() {};
  }
/* Si la url de la barra de navegacion no coincide con la recibida, la actualizamos. */
  if (location.pathname !== url) {
    history.pushState(null, null, url)
  }
}

/* Escuchamos eventos de los botones atras y adelante del navegador y enviamos la nueva url al worker para que actualice el estado */
window.addEventListener('popstate', function () {
  worker.postMessage({type: 'setUrl', payload: location.pathname.toString()})
})


// Escuchamos todos los clicks.
document.body.addEventListener('click', function (event) {
  // handles internal navigation defined as
  // clicks on <a> tags that have `href` that is
  // on the same origin.
  // https://www.npmjs.com/package/local-links
  var pathname = localLinks.getLocalPathname(event)
  if (pathname) {
    // stop browser from following the link
    event.preventDefault()
    // instead, post the new URL to our worker
    // which will trigger compute a new vDom
    // based on that new URL state
    worker.postMessage({type: 'setUrl', payload: pathname})
    return
  }

  // this is for other "onClick" type events we want to
  // respond to. We check existance of an `data-click`
  // attribute and if it exists, post that back.
  // In our case, the messages look like either
  // {type: "increment"}
  // or
  // {type: "decrement"}
  // but could contain any serializable payload
  // describing the action that occured
  var click = event.target['data-click']
  if (click) {
    event.preventDefault()
    worker.postMessage(click)
  }
})

},{"./app.js":34,"./worker.js":41,"local-links":26,"webworkify":30,"yo-yo":32}],36:[function(require,module,exports){
var yo = require('yo-yo')
// var styles = require('./menu-css.js')

// var mc = styles['mdl-card']
// var mct = styles['mdl-card__title']

module.exports = function footer (title) {
return (function () {
          function appendChild (el, childs) {
            for (var i = 0; i < childs.length; i++) {
              var node = childs[i];
              if (Array.isArray(node)) {
                appendChild(el, node)
                continue
              }
              if (typeof node === "number" ||
                typeof node === "boolean" ||
                node instanceof Date ||
                node instanceof RegExp) {
                node = node.toString()
              }

              if (typeof node === "string") {
                if (el.lastChild && el.lastChild.nodeName === "#text") {
                  el.lastChild.nodeValue += node
                  continue
                }
                node = document.createTextNode(node)
              }

              if (node && node.nodeType) {
                el.appendChild(node)
              }
            }
          }
          var bel8 = document.createElement("div")
var bel7 = document.createElement("footer")
bel7.setAttribute("class", "mdl-mini-footer")
var bel6 = document.createElement("div")
bel6.setAttribute("class", "mdl-mini-footer__left-section")
var bel0 = document.createElement("div")
bel0.setAttribute("class", "mdl-logo")
appendChild(bel0, [arguments[0]])
var bel5 = document.createElement("ul")
bel5.setAttribute("class", "mdl-mini-footer__link-list")
var bel2 = document.createElement("li")
var bel1 = document.createElement("a")
bel1.setAttribute("href", "#")
appendChild(bel1, ["Help"])
appendChild(bel2, [bel1])
var bel4 = document.createElement("li")
var bel3 = document.createElement("a")
bel3.setAttribute("href", "#")
appendChild(bel3, ["Privacy & Terms"])
appendChild(bel4, [bel3])
appendChild(bel5, ["\n      ",bel2,"\n      ",bel4,"\n    "])
appendChild(bel6, ["\n    ",bel0,"\n    ",bel5,"\n  "])
appendChild(bel7, ["\n  ",bel6,"\n"])
appendChild(bel8, ["\n",bel7,"\n"])
          return bel8
        }(title))	
}


},{"yo-yo":32}],37:[function(require,module,exports){
var csjs = require('csjs-injectify/csjs-inject');

module.exports = csjs`

 .mdl-card {
 	width:100%;
   background: white;
 }
 .mdl-card__title {
  color: #fff;
  height: 176px;
  background: url('/assets/img/ovnionpanel.jpg') center / cover;

 }

`;

},{"csjs-injectify/csjs-inject":6}],38:[function(require,module,exports){
var yo = require('yo-yo')
var styles = require('./login-css.js')

var mc = styles['mdl-card']
var mct = styles['mdl-card__title']

module.exports = function login (text) {
 return (function () {
          function appendChild (el, childs) {
            for (var i = 0; i < childs.length; i++) {
              var node = childs[i];
              if (Array.isArray(node)) {
                appendChild(el, node)
                continue
              }
              if (typeof node === "number" ||
                typeof node === "boolean" ||
                node instanceof Date ||
                node instanceof RegExp) {
                node = node.toString()
              }

              if (typeof node === "string") {
                if (el.lastChild && el.lastChild.nodeName === "#text") {
                  el.lastChild.nodeValue += node
                  continue
                }
                node = document.createTextNode(node)
              }

              if (node && node.nodeType) {
                el.appendChild(node)
              }
            }
          }
          var bel15 = document.createElement("div")
bel15.setAttribute("id", "container")
var bel14 = document.createElement("div")
bel14.setAttribute("class", "center")
var bel13 = document.createElement("div")
bel13.setAttribute("class", "login")
var bel12 = document.createElement("div")
bel12.setAttribute("class", "demo-card-square " + arguments[3] + " mdl-shadow--2dp")
var bel1 = document.createElement("div")
bel1.setAttribute("class", arguments[2] + " ")
var bel0 = document.createElement("h2")
bel0.setAttribute("class", arguments[0] + "-text")
appendChild(bel0, [arguments[1]])
appendChild(bel1, ["\n    ",bel0,"\n  "])
var bel9 = document.createElement("div")
bel9.setAttribute("class", "mdl-card__supporting-text")
var bel8 = document.createElement("form")
bel8.setAttribute("action", "#")
var bel4 = document.createElement("div")
bel4.setAttribute("class", "mdl-textfield mdl-js-textfield mdl-textfield--floating-label")
var bel2 = document.createElement("input")
bel2.setAttribute("type", "text")
bel2.setAttribute("id", "sample3")
bel2.setAttribute("class", "mdl-textfield__input")
var bel3 = document.createElement("label")
bel3.setAttribute("class", "mdl-textfield__label")
bel3.setAttribute("htmlFor", "sample3")
appendChild(bel3, ["Usuario"])
appendChild(bel4, ["\n    ",bel2,"\n    ",bel3,"\n  "])
var bel7 = document.createElement("div")
bel7.setAttribute("class", "mdl-textfield mdl-js-textfield mdl-textfield--floating-label")
var bel5 = document.createElement("input")
bel5.setAttribute("type", "text")
bel5.setAttribute("id", "sample3")
bel5.setAttribute("class", "mdl-textfield__input")
var bel6 = document.createElement("label")
bel6.setAttribute("class", "mdl-textfield__label")
bel6.setAttribute("htmlFor", "sample3")
appendChild(bel6, ["Contraseña"])
appendChild(bel7, ["\n    ",bel5,"\n    ",bel6,"\n  "])
appendChild(bel8, ["\n  ",bel4,"\n    ",bel7,"\n"])
appendChild(bel9, ["\n",bel8,"\n  "])
var bel11 = document.createElement("div")
bel11.setAttribute("class", "mdl-card__actions mdl-card--border")
var bel10 = document.createElement("a")
bel10.setAttribute("class", "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect")
appendChild(bel10, ["\n     Login\n    "])
appendChild(bel11, ["\n    ",bel10,"\n  "])
appendChild(bel12, ["\n  ",bel1,"\n  ",bel9,"\n  ",bel11,"\n"])
appendChild(bel13, [bel12])
appendChild(bel14, [bel13])
appendChild(bel15, [bel14])
          return bel15
        }(mct,text,mct,mc))	
}


},{"./login-css.js":37,"yo-yo":32}],39:[function(require,module,exports){
var yo = require('yo-yo')
// var styles = require('./menu-css.js')

// var mc = styles['mdl-card']
// var mct = styles['mdl-card__title']

function idfy ( title ) {
  return '#' + title.split(' ').join('').toLowerCase()
}       
module.exports = function menu (state) {
var el = (function () {
          function appendChild (el, childs) {
            for (var i = 0; i < childs.length; i++) {
              var node = childs[i];
              if (Array.isArray(node)) {
                appendChild(el, node)
                continue
              }
              if (typeof node === "number" ||
                typeof node === "boolean" ||
                node instanceof Date ||
                node instanceof RegExp) {
                node = node.toString()
              }

              if (typeof node === "string") {
                if (el.lastChild && el.lastChild.nodeName === "#text") {
                  el.lastChild.nodeValue += node
                  continue
                }
                node = document.createTextNode(node)
              }

              if (node && node.nodeType) {
                el.appendChild(node)
              }
            }
          }
          var bel8 = document.createElement("div")
var bel7 = document.createElement("div")
bel7.setAttribute("class", "mdl-layout mdl-js-layout mdl-layout--fixed-header")
var bel3 = document.createElement("header")
bel3.setAttribute("class", "mdl-layout__header")
var bel1 = document.createElement("div")
bel1.setAttribute("class", "mdl-layout__header-row")
var bel0 = document.createElement("span")
bel0.setAttribute("class", "mdl-layout-title")
appendChild(bel0, [arguments[0]])
appendChild(bel1, ["\n\n      ",bel0,"\n    "])
var bel2 = document.createElement("div")
bel2.setAttribute("class", "mdl-layout__tab-bar mdl-js-ripple-effect")
appendChild(bel2, ["\n      ",arguments[1],"\n   "])
appendChild(bel3, ["\n    ",bel1,"\n\n    ",bel2,"\n  "])
var bel5 = document.createElement("div")
bel5.setAttribute("class", "mdl-layout__drawer")
var bel4 = document.createElement("span")
bel4.setAttribute("class", "mdl-layout-title")
appendChild(bel4, ["Title"])
appendChild(bel5, ["\n    ",bel4,"\n  "])
var bel6 = document.createElement("main")
bel6.setAttribute("class", "mdl-layout__content")
appendChild(bel6, ["\n    ",arguments[2],"\n  "])
appendChild(bel7, ["\n  ",bel3,"\n  ",bel5,"\n  ",bel6,"\n"])
appendChild(bel8, ["\n",bel7,"\n"])
          return bel8
        }(state.title,state.tabs.map(function ( tab ) {
        return (function () {
          function appendChild (el, childs) {
            for (var i = 0; i < childs.length; i++) {
              var node = childs[i];
              if (Array.isArray(node)) {
                appendChild(el, node)
                continue
              }
              if (typeof node === "number" ||
                typeof node === "boolean" ||
                node instanceof Date ||
                node instanceof RegExp) {
                node = node.toString()
              }

              if (typeof node === "string") {
                if (el.lastChild && el.lastChild.nodeName === "#text") {
                  el.lastChild.nodeValue += node
                  continue
                }
                node = document.createTextNode(node)
              }

              if (node && node.nodeType) {
                el.appendChild(node)
              }
            }
          }
          var bel0 = document.createElement("a")
bel0.setAttribute("href", arguments[0])
bel0.setAttribute("class", "mdl-layout__tab")
appendChild(bel0, [arguments[1]])
          return bel0
        }(idfy(tab.title),tab.title))
      }),state.tabs.map( function ( tab ) {
      return (function () {
          function appendChild (el, childs) {
            for (var i = 0; i < childs.length; i++) {
              var node = childs[i];
              if (Array.isArray(node)) {
                appendChild(el, node)
                continue
              }
              if (typeof node === "number" ||
                typeof node === "boolean" ||
                node instanceof Date ||
                node instanceof RegExp) {
                node = node.toString()
              }

              if (typeof node === "string") {
                if (el.lastChild && el.lastChild.nodeName === "#text") {
                  el.lastChild.nodeValue += node
                  continue
                }
                node = document.createTextNode(node)
              }

              if (node && node.nodeType) {
                el.appendChild(node)
              }
            }
          }
          var bel1 = document.createElement("section")
bel1.setAttribute("id", arguments[1])
bel1.setAttribute("class", "mdl-layout__tab-panel")
var bel0 = document.createElement("div")
bel0.setAttribute("class", "page-content")
appendChild(bel0, [arguments[0]])
appendChild(bel1, ["\n      ",bel0,"\n    "])
          return bel1
        }(tab.content,idfy(tab.title)))
    })))	
return el
}


},{"yo-yo":32}],40:[function(require,module,exports){
var yo = require('yo-yo')
var ModMenu = require('./modulos/menu/menu.js')
var ModFooter = require('./modulos/footer/footer.js')
var footer = ModFooter('Copyright')

module.exports = function (state) {return  (function () {
          function appendChild (el, childs) {
            for (var i = 0; i < childs.length; i++) {
              var node = childs[i];
              if (Array.isArray(node)) {
                appendChild(el, node)
                continue
              }
              if (typeof node === "number" ||
                typeof node === "boolean" ||
                node instanceof Date ||
                node instanceof RegExp) {
                node = node.toString()
              }

              if (typeof node === "string") {
                if (el.lastChild && el.lastChild.nodeName === "#text") {
                  el.lastChild.nodeValue += node
                  continue
                }
                node = document.createTextNode(node)
              }

              if (node && node.nodeType) {
                el.appendChild(node)
              }
            }
          }
          var bel1 = document.createElement("div")
var bel0 = document.createElement("div")
bel0.setAttribute("class", "footer")
appendChild(bel0, [arguments[0]])
appendChild(bel1, [arguments[1],bel0])
          return bel1
        }(footer,ModMenu(state)))}

},{"./modulos/footer/footer.js":36,"./modulos/menu/menu.js":39,"yo-yo":32}],41:[function(require,module,exports){
/* Nos permite mantener el estado completo de la aplicacion en un unico objeto que emite eventos ante cualquier modificacion */
var createStore = require('store-emitter')

/* Permite parchear el estado con datos nuevos de manera mas simple. */
var xtend = require('xtend')

/* Exportamos el modulo para que pueda ser importado con webworkify. Esto nos permite manejar todo en un unico bundle de browserify sin necesidad de compilar el worker aparte. */
module.exports = function (self) {
/* Qué vamos a hacer con los eventos que reciba el store.
 * Por el momento, solo respondemos a eventos de modificacion de url. */
function modifier ( action, state ) {
  if (action.type === 'setUrl')
  return xtend(state, {url : action.payload})
}

/* Creamos el store pasando como parámetros la función que lo modifica y el estado inicial. */
var store = createStore(modifier, 
{
  url: '/',
  title: "El titulo",
  tabs: [
  {title: "Primer titulo", content: "Primer contenido", activeTab: true},
  {title: "Segundo titulo", content: "Segundo contenido"},
  {title: "tercer titulo", content: "Segundo contenido"},
  {title: "cuarto titulo", content: "Segundo contenido"},
  {title: "cuarto titulo", content: "Segundo contenido"},
  {title: "cuarto titulo", content: "Segundo contenido"}
  ]
}
)
/* Ante cualquier tipo de modificacion en el estado, enviamos el nuevo estado al UI thread para que actualice las vistas. */
store.on('*', function ( action, state, old ) { 
  self.postMessage(state)
})

/* Ante cualquier evento proveniente del UI thread actualizamos el estado con los nuevos datos. */
self.addEventListener('message', function(ev){store(ev.data)})

/* Inicializamos el UI thread enviandole el estado inicial. */
 // self.postMessage(store.getState())
}

},{"store-emitter":29,"xtend":31}]},{},[35]);
