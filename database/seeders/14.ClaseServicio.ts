import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import TblClaseServicios from "App/Infraestructura/Datos/Entidad/ClaseServicios";

export default class extends BaseSeeder {
  public async run() {
    await TblClaseServicios.createMany([
      {id:1,	nombre: 'Transporte aéreo'},
{id:2,	nombre: 'Transporte marítimo'},
{id:3,	nombre: 'Transporte por carretera'},
{id:4,	nombre: 'Servicios auxiliares de todos los medios de transporte'}
    ]);
  }
}
