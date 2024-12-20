
import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Poliza/ControladorPoliza'
//const aseguradora_path = '../../../app/Presentacion/Aseguradora/ControladorAseguradora';
Route.group(() => {
  Route.get('', accion_path + '.visualizar')
  Route.get('/vehiculos', accion_path + '.obtenerVehiculos')
  Route.post('', accion_path + '.guardar')
  Route.post('/capacidades', accion_path + '.capacidad')

    // fase 2

    Route.get('/listar_polizas', accion_path + '.listarPolizas')
    Route.get('/listar_vehiculos', accion_path + '.listarVehiculos')
    Route.get('/interoperabilidad', accion_path + '.interoperabilidad')
    Route.delete('/eliminar_vehiculos', accion_path + '.eliminarVehiculos')
    Route.post('/agregar_vehiculos', accion_path + '.agregarVehiculos')

    Route.get('/novedades_poliza', accion_path + '.novedadesPoliza')
    Route.get('/gestionar-placa', accion_path + '.gestionarPlaca')
    Route.patch('/desvincular-placa', accion_path + '.desvincularPlaca')

    Route.patch('/actualizar-poliza', accion_path + '.actualizarPoliza')
}).prefix('api/v1/poliza').middleware('autenticacionJwt')


Route.get('/novedades_polizapeccit', accion_path + '.novedadesPolizapeccit')
Route.get('/filtrarPolizas', accion_path +'.filtrarPolizas');
Route.get('/detallepolizas/:pol_id', accion_path +'.listarPolizasPublica');
Route.get('/listaramparo', accion_path + '.listarAmparo');
Route.get('/consultarresponsabilidad', accion_path + '.consultarResponsabilidad')
Route.get('/consultar', accion_path + '.consultarPoliza').prefix('api/v1/poliza')

