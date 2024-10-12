import Route from '@ioc:Adonis/Core/Route'
//import ModalidadPolizasController from 'App/Presentacion/ModalidadPolizas/ModalidadPolizasController';
import ModalidadPolizasController from 'app/Presentacion/ModalidadPolizas/ModalidadPolizasController';
const controlador = '../../../app/Presentacion/ModalidadPolizas/ModalidadPolizasController';
// Rutas para ModalidadPolizas
Route.group(() => {

Route.get('/modalidadpoliza', `${controlador}.index`) // Listar todas las modalidades
Route.post('/modalidadpoliza', `${controlador}.store`) // Crear nueva modalidad
Route.get('/modalidadpoliza/:id', `${controlador}.show`) // Obtener una modalidad específica
Route.put('/modalidadpoliza/:id', `${controlador}.update`) // Actualizar una modalidad
Route.delete('/modalidadpoliza/:id', `${controlador}.destroy`) // Eliminar una modalidad

}).prefix('api/v1/poliza').middleware('autenticacionJwt')