/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Mx/ControladorMx'


Route.group(() => {
  Route.get('/', accion_path + '.obtenerMxs')
  Route.get('/:id', accion_path + '.obtenerMx')
  Route.post('/', accion_path + '.crearMx')
  Route.put('/', accion_path + '.actualizarMxAll') //all
  Route.delete('/:id', accion_path + '.eliminarMx')
}).prefix('api/v1/mx').middleware('autenticacionJwt')