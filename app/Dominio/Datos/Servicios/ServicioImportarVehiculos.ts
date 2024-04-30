import Excel from 'exceljs';
import fs from 'fs';
import * as path from 'path';
import csv from 'csv-stringify'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';
import { Resultado } from 'App/Dominio/Resultado';
import { ErrorFormatoImportarExcel } from './Dtos/ErrorFormatoImportarExcel';
import { RespuestaImportacionExcel } from './Dtos/RespuestaImportacionExcel';
import TblVehiculos from 'App/Infraestructura/Datos/Entidad/Vehiculos';
import { Vehiculo } from '../Entidades/Vehiculo';

export class ServicioImportarVehiculos {
  async importDataXLSX(
    archivo: MultipartFileContract,
    poliza: number
  ): Promise<Resultado<RespuestaImportacionExcel>> {
    let rutaArchivo;
    try {
      const fname = `${new Date().getTime()}.${archivo.extname}`;
      const dir = 'uploads/';

      // Mueve el archivo cargado a la carpeta 'uploads' en la raíz del proyecto
      await archivo.move(path.resolve(dir), {
        name: fname
      });

      if (!archivo.isValid) {
        console.log('Error al mover el archivo');
        /* return ['Error moving files', 500]; */
        return new Resultado({
          estado: 500,
          mensaje: 'Error al mover el archivo',
          exitoso: false
        });
      }

      const filePath = path.resolve(`${dir}${fname}`);
      rutaArchivo = filePath;
      // Resto de la lógica del servicio...
      let resultado = await this.importVehiculos(filePath, poliza)
      return resultado
    } catch (error) {
      console.error(error);
      return new Resultado({
        estado: 500,
        mensaje: 'Error del servidor',
        exitoso: false
      });
    } finally {
      // Eliminar el archivo, independientemente del resultado
      if (rutaArchivo) {
        try {
          await fs.promises.unlink(rutaArchivo);
          console.log('Archivo eliminado exitosamente.');
        } catch (unlinkError) {
          console.error('Error al eliminar el archivo:', unlinkError);
        }
      }
    }
  }

  async importVehiculos(filelocation, poliza: number): Promise<Resultado<RespuestaImportacionExcel>> {
    let resultado: Resultado<ErrorFormatoImportarExcel[]>
    let libro = new Excel.Workbook()
    libro = await libro.xlsx.readFile(filelocation)
    let hoja = libro.getWorksheet('Hoja1')! // get sheet name
    let colComment = hoja.getColumn('A') //column name
    
      return this.import(colComment, hoja, poliza);
    
    /* return new Resultado({
      estado: 500,
      exitoso: false
    }) */
  }

  async import(colComment: Excel.Column,hoja: Excel.Worksheet, poliza:number): Promise<Resultado<RespuestaImportacionExcel>> {
    
    const errores = await this.validarVehiculos(hoja, poliza)
    
    if (errores.length > 0) {
      const archivoB64 = await this.generarCsvErrores(errores)
      return new Resultado({
        exitoso: false,
        estado: 422,
        datos: { errores, archivo: archivoB64 },
        mensaje: 'Hay errores de validación.'
      })
    }

    await TblVehiculos.query().where('veh_poliza',poliza).delete();
    
    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 2) {
        const placa = hoja.getCell('A' + rowNumber).value!.toString().toUpperCase();
        const pasajeros = parseInt(hoja.getCell('B' + rowNumber).value!.toString())
        if (placa !== '') {
          //custom field name in database to variable
          const inputPlaca: Vehiculo = {
            placa,
            pasajeros,
            poliza
          }
          try {
            await TblVehiculos.updateOrCreate({ placa: inputPlaca.placa }, inputPlaca)
          } catch (error) {
            console.log(error);
            
          }
        }
      }
    })
    return new Resultado({
      exitoso: true,
      estado: 200,
      mensaje:'Archivo cargado correctamente'
    })

  }

  /* async validarVehiculos(hoja: Excel.Worksheet, poliza: number): Promise<ErrorFormatoImportarExcel[]> {
    let errores: ErrorFormatoImportarExcel[] = []
    let seEncontroFilaValida = false; 
    hoja.eachRow(fila => {
      if (fila.number > 1) {
        seEncontroFilaValida = true;
        const placa = fila.getCell('A').value?.valueOf()
        const pasajeros = fila.getCell('B').value?.valueOf()
        //Validar existencia
        if (!placa) {
          errores.push({
            columna: 'A',
            fila: fila.number.toString(),
            error: 'El valor no puede ser vacío.',
            valor: null
          })
        } else {
          if ( typeof placa === 'string') {
            if(placa.length > 6){
              errores.push({
                columna: 'A',
                fila: fila.number.toString(),
                error: `La placa no pude tener mas de 6 caracteres`,
                valor: placa
              })
            }          
            let placaEx:any
               TblVehiculos.findBy('veh_placa', placa.toUpperCase()).then( async resp =>{
                placaEx = await resp?.placa
                console.log(placaEx);
                
              });
              console.log(placaEx);
              
              if(existePlaca)
             { 
              console.log("Entro");
              
             errores.push({
                columna: 'A',
                fila: fila.number.toString(),
                error: `La placa ya esta registrada en otra poliza`,
                valor: placa
              })
            }

          }
        }

        if (!pasajeros) {
          errores.push({
            columna: 'B',
            fila: fila.number.toString(),
            error: 'El valor no puede ser vacío.',
            valor: null
          })
        } else {
          if ( typeof pasajeros === 'number') {            
            if(pasajeros.toString().length > 2){
              errores.push({
                columna: 'B',
                fila: fila.number.toString(),
                error: `La cantidad de pasajeros no pude tener mas de 2 caracteres`,
                valor: pasajeros
              })
            }
          
          }
        }

      }
    })

    if (!seEncontroFilaValida) {
      errores.push({
        columna: '',
        fila: '',
        error: 'El archivo está vacío o no contiene filas válidas.',
        valor: null
      });
    }
    
    
    return errores
  } */

  async validarVehiculos(hoja: Excel.Worksheet, poliza: number): Promise<ErrorFormatoImportarExcel[]> {
    let errores: ErrorFormatoImportarExcel[] = [];
  let seEncontroFilaValida = false;

  const rowCount = hoja.rowCount;
  for (let i = 2; i <= rowCount; i++) {
    const fila = hoja.getRow(i);

    const placaCell = fila.getCell('A');
    const pasajerosCell = fila.getCell('B');

    const placa = placaCell ? placaCell.value?.toString().trim() : null;
    const pasajeros = pasajerosCell ? pasajerosCell.value?.toString().trim() : null;

    // Validar existencia de placa
    if (!placa) {
      errores.push({
        columna: 'A',
        fila: i.toString(),
        error: 'El valor no puede ser vacío.',
        valor: null
      });
    } else if (placa.length !== 6) {
      errores.push({
        columna: 'A',
        fila: i.toString(),
        error: 'La placa debe tener 6 caracteres.',
        valor: placa
      });
    } else {
      try {
        // Consultar si la placa existe en la tabla TblVehiculos
        /* const vehiculoExistente = await TblVehiculos.query().where('veh_placa', placa.toUpperCase()).first(); */
        const vehiculoExistente = await TblVehiculos.query()
    .where('veh_placa', placa.toUpperCase())
    .where('veh_poliza', '!=', poliza)
    .first();
        if (vehiculoExistente) {
          errores.push({
            columna: 'A',
            fila: i.toString(),
            error: 'La placa ya existe en otra poliza.',
            valor: placa
          });
        }
      } catch (error) {
        console.error('Error al consultar la base de datos:', error);
      }
    }

    // Validar existencia de pasajeros
    if (!pasajeros) {
      errores.push({
        columna: 'B',
        fila: i.toString(),
        error: 'El valor no puede ser vacío.',
        valor: null
      });
    } else if (pasajeros.length > 2) {
      errores.push({
        columna: 'B',
        fila: i.toString(),
        error: 'La cantidad de pasajeros no puede tener más de 2 caracteres.',
        valor: pasajeros
      });
    }

    if (!seEncontroFilaValida) {
      seEncontroFilaValida = true;
    }
  }

  if (!seEncontroFilaValida) {
    errores.push({
      columna: '',
      fila: '',
      error: 'El archivo está vacío o no contiene filas válidas.',
      valor: null
    });
  }

  return errores;
  }

  generarCsvErrores(errores: ErrorFormatoImportarExcel[]): Promise<string>{
    const dataCsv: any[][] = []
    const cabeceras = [ "Nro", "Celda", "Descripción" ]
    dataCsv.push(cabeceras)
    errores.forEach( (error, indice) => {
      dataCsv.push([ indice + 1, `${error.columna}${error.fila}`, error.error ])
    })
    return new Promise<string>((resolve, reject) =>{
      csv.stringify(dataCsv, {header: false}, (error, ouput)=>{
        if(error){
          reject(error)
        }else{
          resolve(Buffer.from(ouput).toString('base64'))
        }
      })
    })
  }

 

}