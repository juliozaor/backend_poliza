
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Poliza/ControladorPoliza'

Route.group(() => {
  Route.get('', accion_path + '.visualizar')
  Route.post('', accion_path + '.guardar')
  Route.post('/capacidades', accion_path + '.capacidad')
}).prefix('api/v1/poliza').middleware('autenticacionJwt')
