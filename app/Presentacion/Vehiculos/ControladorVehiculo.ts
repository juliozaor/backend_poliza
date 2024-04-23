import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ServicioImportarVehiculos } from "App/Dominio/Datos/Servicios/ServicioImportarVehiculos";
import fs from "fs";
const path = require("path");

export default class Controladorvehiculo {
  private servicioImportacionVehiculos: ServicioImportarVehiculos;
  constructor() {
    this.servicioImportacionVehiculos = new ServicioImportarVehiculos();
  }
  async descargarPlantilla({ params }: HttpContextContract) {
    const { archivo } = params;
    const relativePath = "uploads/plantillas/";
    if (archivo) {
      try {
        const absolutePath = path.resolve(`${relativePath}${archivo}`);
        console.log(absolutePath);

        let archivoDescargar = fs.readFileSync(`${absolutePath}`, "base64");
        return archivoDescargar;
      } catch (error) {
        return {
          mensaje: `No se encontro el archivo solicitado`,
          error,
        };
      }
    }
  }

  public async importar({ request, response }: HttpContextContract) {
    const archivo = request.file("archivo", {
      extnames: ["xlsx", "xls"],
    });
    if (!archivo) {
      return response.status(400).send({ mensaje: "No se encontro archivo" });
    }

    if (!archivo.isValid) {
      return response
        .status(415)
        .send({
          mensaje: `Formato inválido: no se puede cargar el archivo seleccionado. Inténtalo nuevamnte`,
        });
    }
    
    const { poliza } = request.all();
    if (!poliza) {
      return response.status(400).send({ mensaje: "La poliza es requerida" });
    }

    try {
      const respuesta = await this.servicioImportacionVehiculos.importDataXLSX(
        archivo, poliza
      );
      console.log("En el controlador", respuesta);
      return response
        .status(respuesta.estado)
        .send(respuesta.datos ?? respuesta.mensaje);
    } catch (error) {
      return response
        .status(400)
        .send({ mensaje: "Se presento un error al cargar el archivo" });
    }
  }
}
