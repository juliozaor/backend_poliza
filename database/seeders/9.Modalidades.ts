import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import TblModalidades from "App/Infraestructura/Datos/Entidad/Modalidades";

export default class extends BaseSeeder {
  public async run() {
    await TblModalidades.createMany([
      {
        id: 1,
        nombre: "PC Pasajeros",
        
      },{
        id: 2,
        nombre: "ES Especial",
        
      },{
        id: 3,
        nombre: "MX Mixto",
        
      }
    ]);
  }
}
