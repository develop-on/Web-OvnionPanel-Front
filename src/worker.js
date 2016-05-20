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
