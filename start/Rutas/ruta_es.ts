/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Es/ControladorEs'


Route.group(() => {
  Route.get('/', accion_path + '.obtenerEss')
  Route.get('/vigilado', accion_path + '.obtenerEsVigilado')
  Route.get('/:id', accion_path + '.obtenerEs')
  Route.post('/', accion_path + '.crearEs')
  Route.put('/', accion_path + '.actualizarEsAll') //all
  Route.delete('/:id', accion_path + '.eliminarEs')
}).prefix('api/v1/es').middleware('autenticacionJwt')