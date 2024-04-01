import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import TblTiposAmparos from "App/Infraestructura/Datos/Entidad/TiposAmparo";

export default class extends BaseSeeder {
  public async run() {
    await TblTiposAmparos.createMany([
      {
        id: 1,
        nombre: "AMPAROS BÁSICOS",
        orden: 1,
      },
      {
        id: 2,
        nombre: "AMPAROS ADICIONALES",
        orden: 2,
      },
    ]);
  }
}
