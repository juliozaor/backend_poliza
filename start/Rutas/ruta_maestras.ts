import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Maestra/ControladorMaestra'

Route.group(() => {
  Route.get('modalidades', accion_path + '.modalidades')
  Route.get('aseguradoras', accion_path + '.aseguradoras')
}).prefix('api/v1/maestras').middleware('autenticacionJwt')
