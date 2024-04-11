/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Pc/ControladorPc'


Route.group(() => {
  Route.get('/', accion_path + '.obtenerPcs')
  Route.get('/vigilado', accion_path + '.obtenerPcVigilado')
  Route.get('/:id', accion_path + '.obtenerPc')
  Route.post('/', accion_path + '.crearPc')
  Route.put('/', accion_path + '.actualizarPcAll') //all
  Route.delete('/:id', accion_path + '.eliminarPc')
}).prefix('api/v1/pc').middleware('autenticacionJwt')