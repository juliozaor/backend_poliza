import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Maestra/ControladorMaestra'

Route.group(() => {
  Route.get('modalidades', accion_path + '.modalidades')
}).prefix('api/v1/maestras').middleware('autenticacionJwt')
