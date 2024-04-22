import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import TblTipoServicios from "App/Infraestructura/Datos/Entidad/TipoServicios";

export default class extends BaseSeeder {
  public async run() {
    await TblTipoServicios.createMany([
      {id:1,	nombre: 'Servicio publico'},
{id:2,	nombre: 'Servicio particular'}
    ]);
  }
}
