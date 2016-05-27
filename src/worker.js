var getMilestones = require('./get-milestones.js')
/* Nos permite mantener el estado completo de la aplicacion en un unico objeto que emite eventos ante cualquier modificacion */
var store = require('./store.js')

/* Exportamos el modulo para que pueda ser importado con webworkify. Esto nos permite manejar todo en un unico bundle de browserify sin necesidad de compilar el worker aparte. */
module.exports = function (self) {

/* Ante cualquier tipo de modificacion en el estado, enviamos el nuevo estado al UI thread para que actualice las vistas. */
store.on('*', function ( action, state, old ) { 
  if (action.payload === '/milestones') getMilestones()
  self.postMessage(state)
})

/* Ante cualquier evento proveniente del UI thread actualizamos el estado con los nuevos datos. */
self.addEventListener('message', function(ev){store(ev.data)})

/* Inicializamos el UI thread enviandole el estado inicial. */
 // self.postMessage(store.getState())
}
