import Excel from 'exceljs';
import fs from 'fs';
import * as path from 'path';
import csv from 'csv-stringify'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';
import { Resultado } from 'App/Dominio/Resultado';
import { ErrorFormatoImportarExcel } from './Dtos/ErrorFormatoImportarExcel';
import { RespuestaImportacionExcel } from './Dtos/RespuestaImportacionExcel';
import TblMarcas from 'App/Infraestructura/Datos/Entidad/Marcas';

export class ServicioImportarVehiculos {
  async importDataXLSX(
    archivo: MultipartFileContract
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
      let resultado = await this.importVehiculos(filePath)
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

  async importVehiculos(filelocation): Promise<Resultado<RespuestaImportacionExcel>> {
    let resultado: Resultado<ErrorFormatoImportarExcel[]>
    let libro = new Excel.Workbook()
    libro = await libro.xlsx.readFile(filelocation)
    let hoja = libro.getWorksheet('Hoja1')! // get sheet name
    let colComment = hoja.getColumn('A') //column name
    console.log(colComment);
    
      return this.import(colComment, hoja);
    
    /* return new Resultado({
      estado: 500,
      exitoso: false
    }) */
  }
v
  async import(
    colComment: Excel.Column,
    hoja: Excel.Worksheet): Promise<Resultado<RespuestaImportacionExcel>> {
    const errores = await this.validarVehiculos(hoja)
    if (errores.length > 0) {
      const archivoB64 = await this.generarCsvErrores(errores)
      return new Resultado({
        exitoso: false,
        estado: 422,
        datos: { errores, archivo: archivoB64 },
        mensaje: 'Hay errores de validación.'
      })
    }

    await TblVehiculosPatios.query().where({ 'veh_vigilado': idVigilado, 'veh_vigencia': vigencia, 'veh_mes': mes }).delete();

    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 2) {
        const patio = hoja.getCell('A' + rowNumber).value!.toString()
        const placa = hoja.getCell('B' + rowNumber).value!.toString()
        const ingreso = hoja.getCell('C' + rowNumber).value
        if (placa !== '' && patio !== '' && ingreso !== '') {
          //custom field name in database to variable
          const inputPlaca: VehiculoPatio = {
            patioId: patio,
            placa: placa.toString().toLocaleLowerCase(),
            ingreso: new Date(ingreso!.toString()),
            vigilado: idVigilado,
            vigencia, mes
          }
          try {
            const vehiculo = new TblVehiculosPatios()
            vehiculo.estableceVehiculoConId(inputPlaca)
            await vehiculo.save()
            console.log(vehiculo.id);
          } catch (error) {
            console.log('la placa ya existe');
          }
        }
      }
    })
    return new Resultado({
      exitoso: true,
      estado: 200
    })
  }

  async validarVehiculos(hoja: Excel.Worksheet): Promise<ErrorFormatoImportarExcel[]> {
    const marcas = await TblMarcas.all()
    const nombresMarcas = marcas.map(marca => marca.nombre)
    let errores: ErrorFormatoImportarExcel[] = []
    hoja.eachRow(fila => {
      if (fila.number > 1) {
        const placa = fila.getCell('A').value?.valueOf()
        const marca = fila.getCell('B').value?.valueOf()
        const modelo = fila.getCell('C').value?.valueOf()
        const tipo = fila.getCell('D').value?.valueOf()
        const clase = fila.getCell('E').value?.valueOf()
        const cantidad = fila.getCell('F').value?.valueOf()
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
          }
        }

        if (!marca) {
          errores.push({
            columna: 'B',
            fila: fila.number.toString(),
            error: 'El valor no puede ser vacío.',
            valor: null
          })
        } else {
          if ( typeof marca === 'string') {            
            const existeMarca = nombresMarcas.includes(marca)
            if (!existeMarca) {
              errores.push({
                columna: 'B',
                fila: fila.number.toString(),
                error: `No existe la marca: ${marca}`,
                valor: marca
              })
            }
          
          }
        }

      }
    })
    return errores
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

 /*
  importModalidades = async (
    colComment: Excel.Column,
    idVigilado: string,
    hoja: Excel.Worksheet,
    vigencia: number,
    mes: number
  ): Promise<Resultado<RespuestaImportacionExcel>> => {
    const errores = await this.validarModalidades(hoja)
    if(errores.length > 0){
      const archivoB64 = await this.generarCsvErrores(errores)
      return new Resultado({
        exitoso: false,
        estado: 422,
        datos: {errores, archivo: archivoB64},
        mensaje: 'Hay errores de validación.'
      })
    }
    await TblVehiculosModalidades.query().where({ 'vep_vigilado': idVigilado, 'vep_vigencia': vigencia, 'vep_mes': mes }).delete();
    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 2) {
        const nit = hoja.getCell('A' + rowNumber).value?.valueOf()
        const modalidad = hoja.getCell('B' + rowNumber).value?.valueOf()
        const placa = hoja.getCell('C' + rowNumber).value?.valueOf()
        if (placa !== '' && nit !== '' && modalidad !== '') {

          //custom field name in database to variable
          const inputPlaca: VehiculoModalidad = {
            nit: nit!.toString(),
            placa: placa!.toString().toLocaleLowerCase(),
            modalidadId: modalidad!.toString(),
            vigilado: idVigilado,
            vigencia,
            mes
          }
          try {
            const vehiculo = new TblVehiculosModalidades()
            vehiculo.estableceVehiculoConId(inputPlaca)
            await vehiculo.save()
            console.log(vehiculo.id);
          } catch (error) {
            console.log(`la placa ${placa} ya existe`);
          }
        }
      }
    })
    return new Resultado({
      exitoso: true,
      estado: 200
    })
  }

  

  async validarModalidades(hoja: Excel.Worksheet): Promise<ErrorFormatoImportarExcel[]> {
    const modalidades = await TblModalidades.query()
    const idModalidades = modalidades.map(modalidad => modalidad.id)
    let errores: ErrorFormatoImportarExcel[] = []
    hoja.eachRow(fila => {
      if (fila.number > 1) {
        const nit = fila.getCell('A').value?.valueOf()
        const idModalidad = fila.getCell('B').value?.valueOf()
        const numeroPlaca = fila.getCell('C').value?.valueOf()
        //Validar exitencia
        if (!nit || nit === '') {
          errores.push({
            columna: 'A',
            fila: fila.number.toString(),
            error: 'El valor no puede ser vacío.',
            valor: nit
          })
        }

        if (!idModalidad || idModalidad === '') {
          errores.push({
            columna: 'B',
            fila: fila.number.toString(),
            error: 'El valor no puede ser vacío.',
            valor: idModalidad
          })
        } else {
          if (typeof idModalidad === 'string' || typeof idModalidad === 'number') {
            const existeModalidad = idModalidades.includes(Number(idModalidad))
            if (!existeModalidad) {
              errores.push({
                columna: 'B',
                fila: fila.number.toString(),
                error: `No existe la modalidad con id: ${idModalidad}`,
                valor: idModalidad
              })
            }
          }
        }

        if (!numeroPlaca || numeroPlaca === '') {
          errores.push({
            columna: 'C',
            fila: fila.number.toString(),
            error: 'El valor no puede ser vacío.',
            valor: numeroPlaca
          })
        } else { }
      }
    })
    return errores
  }

 */

}