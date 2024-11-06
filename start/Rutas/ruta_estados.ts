import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Estados/ControladorEstados'

Route.group(() => {
  Route.get('/enviadost', accion_path + '.enviadoSt')
}).prefix('api/v1/estados').middleware('autenticacionJwt')


Route.get('/api/v1/estados/enviadostP/:id', accion_path + '.enviadoStPublica')
