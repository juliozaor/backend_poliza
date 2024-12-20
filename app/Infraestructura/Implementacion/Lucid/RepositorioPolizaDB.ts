import { RepositorioPoliza } from "App/Dominio/Repositorios/RepositorioPoliza";
/* import TblTiposPolizas from "App/Infraestructura/Datos/Entidad/TiposPoliza"; */
import TblPolizas from "App/Infraestructura/Datos/Entidad/poliza";
import TblDetallesPolizaCoberturas from "App/Infraestructura/Datos/Entidad/DetallespolizaCobertura";
import { Responsabilidad } from "App/Dominio/Datos/Entidades/responsabilidad";
import TblResponsabilidades from "App/Infraestructura/Datos/Entidad/responsabilidades";
import { Archivo } from "App/Dominio/Datos/Entidades/archivo";
import TblArchivo from "App/Infraestructura/Datos/Entidad/Archivos";
import TblCapacidades from "App/Infraestructura/Datos/Entidad/Capacidades";
import Database from "@ioc:Adonis/Lucid/Database";
import { MapeadorPaginacionDB } from "./MapeadorPaginacionDB";
import Errores from "App/Exceptions/Errores";
import { ServicioEstados } from "App/Dominio/Datos/Servicios/ServicioEstados";
import TblVehiculos from "App/Infraestructura/Datos/Entidad/Vehiculos";
import { TblLogVehiculos } from "App/Infraestructura/Datos/Entidad/LogVehiculos";
import {Poliza}  from 'App/Dominio/Datos/Entidades/Poliza';
import TblPolizasModalidades from 'App/Dominio//Datos/Entidades/Polizas_Modalidades';
import TblHistorialRenovacion from "App/Infraestructura/Datos/Entidad/HistorialRenovaciones";


export class RepositorioPolizaDB implements RepositorioPoliza {
  private servicioEstados = new ServicioEstados();


  public async buscarPorVigiladoId(usn_identificacion: string) {
    const polizas = await Database
      .from('tbl_polizas')
      .innerJoin('tbl_usuarios', 'tbl_polizas.pol_vigilado_id', 'tbl_usuarios.usn_id')
      .where('tbl_usuarios.usn_identificacion', usn_identificacion)
      .select('tbl_polizas.*');

    return polizas;
  }


  public async listarPolizasporNumero(
    usn_identificacion: string,
    pol_numero?: string,
    page: number = 1,
    limit: number = 10
): Promise<any> {
    const offset = (page - 1) * limit;

    const countQuery = Database.from('tbl_polizas')
        .innerJoin('tbl_usuarios', 'tbl_polizas.pol_vigilado_id', 'tbl_usuarios.usn_id')
        .innerJoin('tbl_aseguradoras', 'tbl_polizas.pol_aseguradora_id', 'tbl_aseguradoras.ase_id')
        .innerJoin('tbl_tipos_polizas', 'tbl_polizas.pol_tipo_poliza_id', 'tbl_tipos_polizas.tpo_id')
        .where('tbl_usuarios.usn_identificacion', usn_identificacion);


    if (pol_numero) {
        countQuery.where('tbl_polizas.pol_numero', pol_numero);
    }


    const totalPolizasResult = await countQuery.count('* as total');
    const totalPolizas = totalPolizasResult[0].total;


    const polizasQuery = TblPolizas.query()
        .innerJoin('tbl_usuarios', 'tbl_polizas.pol_vigilado_id', 'tbl_usuarios.usn_id')
        .innerJoin('tbl_aseguradoras', 'tbl_polizas.pol_aseguradora_id', 'tbl_aseguradoras.ase_id')
        .innerJoin('tbl_tipos_polizas', 'tbl_polizas.pol_tipo_poliza_id', 'tbl_tipos_polizas.tpo_id')
        .leftJoin('tbl_vehiculos', 'tbl_polizas.pol_numero', 'tbl_vehiculos.veh_poliza')
        .where('tbl_usuarios.usn_identificacion', usn_identificacion)
        .preload('modalidades', (modalidadesQuery) => {
          modalidadesQuery.preload('obj_modalidad'); // Preload de la tabla tbl_modalidadpolizas
      })
        .select( 'tbl_polizas.pol_id',

            'tbl_polizas.pol_numero',
            'tbl_polizas.pol_vigilado_id',
            'tbl_polizas.pol_aseguradora_id',
            'tbl_polizas.pol_tipo_poliza_id',
            'tbl_polizas.pol_inicio_vigencia',
            'tbl_polizas.pol_fin_vigencia',
            'tbl_polizas.pol_responsabilidad',
            'tbl_polizas.pol_estado',
            'tbl_polizas.pol_creado',
            'tbl_polizas.pol_actualizado',
            'tbl_aseguradoras.ase_nombre',
            'tbl_tipos_polizas.tpo_nombre',
            'tbl_tipos_polizas.tpo_descripcion',
            Database.raw('COUNT(tbl_vehiculos.veh_id) as vehiculos_asociados')
          )

        .groupBy( 'tbl_polizas.pol_id',
            'tbl_polizas.pol_numero',
            'tbl_polizas.pol_vigilado_id',
            'tbl_polizas.pol_aseguradora_id',
            'tbl_polizas.pol_tipo_poliza_id',
            'tbl_polizas.pol_inicio_vigencia',
            'tbl_polizas.pol_fin_vigencia',
            'tbl_polizas.pol_responsabilidad',
            'tbl_polizas.pol_estado',
            'tbl_polizas.pol_creado',
            'tbl_polizas.pol_actualizado',
            'tbl_aseguradoras.ase_nombre',
            'tbl_tipos_polizas.tpo_nombre',
            'tbl_tipos_polizas.tpo_descripcion');;


    if (pol_numero) {
        polizasQuery.where('tbl_polizas.pol_numero', pol_numero);
    }


    const polizas = await polizasQuery

        .limit(limit)
        .offset(offset);


    const totalVehiculosResult = await Database.from('tbl_vehiculos')
        .innerJoin('tbl_polizas', 'tbl_vehiculos.veh_poliza', 'tbl_polizas.pol_numero')
        .innerJoin('tbl_usuarios', 'tbl_polizas.pol_vigilado_id', 'tbl_usuarios.usn_id')
        .where('tbl_usuarios.usn_identificacion', usn_identificacion)
        .count('* as total_vehiculos');

    const totalVehiculos = totalVehiculosResult[0].total_vehiculos;


    const totalPolizasActivas = await Database.from('tbl_polizas')
        .innerJoin('tbl_usuarios', 'tbl_polizas.pol_vigilado_id', 'tbl_usuarios.usn_id')
        .where('tbl_polizas.pol_estado', true)
        .andWhere('tbl_usuarios.usn_identificacion', usn_identificacion)
        .count('* as total_activas');

    const totalPolizasExcontractuales = await Database.from('tbl_vehiculos')
    .innerJoin('tbl_polizas', 'tbl_vehiculos.veh_poliza', 'tbl_polizas.pol_numero')
    .innerJoin('tbl_usuarios', 'tbl_polizas.pol_vigilado_id', 'tbl_usuarios.usn_id')
    .where('tbl_usuarios.usn_identificacion', usn_identificacion)
    .where('tbl_polizas.pol_tipo_poliza_id', 2)
    .count('* as total_vehiculos');


    const totalPolizasContractuales = await Database.from('tbl_vehiculos')
    .innerJoin('tbl_polizas', 'tbl_vehiculos.veh_poliza', 'tbl_polizas.pol_numero')
    .innerJoin('tbl_usuarios', 'tbl_polizas.pol_vigilado_id', 'tbl_usuarios.usn_id')
    .where('tbl_usuarios.usn_identificacion', usn_identificacion)
    .where('tbl_polizas.pol_tipo_poliza_id', 1)
    .count('* as total_vehiculos');


    const totalPages = Math.ceil(totalPolizas / limit);


    return {
        total: totalPolizas,
        totalPages: totalPages,
        page: page,
        limit: limit,
        data: polizas,
        totalVehiculos: totalVehiculos,
        totalPolizasActivas: totalPolizasActivas[0].total_activas,
        totalPolizasExcontractuales: totalPolizasExcontractuales[0].total_vehiculos,
        totalPolizasContractuales: totalPolizasContractuales[0].total_vehiculos
    };
}

  async visualizar(params: any, vigiladoId: string): Promise<any> {
    const { poliza, tipoPoliza } = params;
    let polizaR: any;
    const polizaDb = await TblPolizas.query()
      .preload("covertura")
      .preload("responsabilidades")
      .preload("archivo")
      .preload('modalidades', (modalidadesQuery) => {
        modalidadesQuery.preload('obj_modalidad'); // Preload de la tabla tbl_modalidadpolizas
      })
      .where({ pol_numero: poliza, pol_tipo_poliza_id: tipoPoliza })
      .first();

    if (polizaDb) {


      polizaR = {
        modalidades:polizaDb.modalidades,
        numero: polizaDb.numero,
        aseguradoraId: polizaDb.aseguradoraId,
        inicioVigencia: polizaDb.inicioVigencia,
        finVigencia: polizaDb.finVigencia,
        amparos: polizaDb.covertura?.map((covertura) => {
          return {
            coberturaId: covertura.coberturaId,
            valorAsegurado: covertura.valorAsegurado,
            limite: covertura.limite,
            deducible: covertura.deducible,
          };
        }),
        responsabilidad: polizaDb.responsabilidad,
        responsabilidades: polizaDb.responsabilidades
          ? {
              fechaConstitucion: polizaDb.responsabilidades.fechaConstitucion,
              resolucion: polizaDb.responsabilidades.resolucion,
              fechaResolucion: polizaDb.responsabilidades.fechaResolucion,
              valorReserva: polizaDb.responsabilidades.valorReserva,
              fechaReserva: polizaDb.responsabilidades.fechaReserva,
              informacion: polizaDb.responsabilidades.informacion,
              operacion: polizaDb.responsabilidades.operacion,
              valorCumplimiento_uno:
                polizaDb.responsabilidades.valorCumplimientoUno,
              valorCumplimiento_dos:
                polizaDb.responsabilidades.valorCumplimientoDos,
            }
          : null,
        archivo: polizaDb.archivo[0]
          ? {
              nombre: polizaDb.archivo[0].nombre,
              nombreOriginal: polizaDb.archivo[0].nombreOriginal,
              ruta: polizaDb.archivo[0].ruta,
            }
          : null,
      };
    }

    return polizaR;
  }

  async guardar(datos: any, vigiladoId: string): Promise<any> {
    const { polizaContractual, polizaExtracontractual, modalidadesPJson } = datos;

    try {

      await this.guardarPoliza(polizaContractual, vigiladoId, 1, modalidadesPJson);

      if (polizaExtracontractual) {

        await this.guardarPoliza(polizaExtracontractual, vigiladoId, 2, modalidadesPJson);
      }

      this.servicioEstados.Log(vigiladoId, 3);


      try {
        await Database.rawQuery(`
          DELETE FROM tbl_vehiculos
          WHERE veh_vigilado_id = '${vigiladoId}'
          AND veh_placa NOT IN (
            SELECT v.veh_placa
            FROM tbl_vehiculos v
            LEFT JOIN tbl_polizas  p ON v.veh_poliza = p.pol_numero
            WHERE p.pol_numero IS NOT null
          )
        `);
      } catch (error) {
        console.log("No se encontraron placas a eliminar");
      }

      return {
        mensaje: "Polizas guardada correctamente",
      };
    } catch (error) {
      throw error;
    }
  }


  guardarPoliza = async (
    poliza: any,
    vigiladoId: string,
    tipoPoliza: number,
    modalidadesPJson: Array<{ id: string; nombre: string }>
  ) => {
    const polizaDBExiste = await TblPolizas.query()
      .where("pol_numero", poliza.numero)
      .andWhere("pol_tipo_poliza_id", tipoPoliza)
      .first();

    if (polizaDBExiste) {
      throw new Errores(`La poliza '${poliza.numero}', ya existe`, 400);
    }

    const tipo = tipoPoliza == 1 ? 2 : 1;
    const polizaExisteUsuario = await TblPolizas.query()
      .where("pol_numero", poliza.numero)
      .andWhere("pol_tipo_poliza_id", tipo)
      .andWhere("pol_vigilado_id", "<>", vigiladoId)
      .first();

    if (polizaExisteUsuario) {
      throw new Errores(`La poliza '${poliza.numero}', ya existe`, 400);
    }

    const polizaDB = new TblPolizas();
    polizaDB.establecerPolizaDb(poliza);
    polizaDB.responsabilidad = poliza.tieneResponsabilidad ?? false;
    polizaDB.vigiladoId = vigiladoId;
    polizaDB.tipoPolizaId = tipoPoliza;
    await polizaDB.save();


    if (modalidadesPJson && modalidadesPJson.length > 0) {
      for (const modalidad of modalidadesPJson) {

        const modalidadIdNumerico = modalidad.id !== undefined && !isNaN(Number(modalidad.id))
          ? Number(modalidad.id)
          : undefined;

        await TblPolizasModalidades.create({
          pol_id: polizaDB.id,
          modpol_id: modalidadIdNumerico,
        });
      }
    }


    const amparosIn = new Array();
    poliza.amparos.forEach((amparo) => {
      amparo.poliza = poliza.numero;
      amparosIn.push(amparo);
    });

    if (poliza.responsabilidad) {
      await this.guardarResponsabilidad(poliza.responsabilidad, poliza.numero);
    }

    if (poliza.caratula) {
      await this.guardarArchivo(poliza.caratula, poliza.numero);
    }

    try {
      await TblDetallesPolizaCoberturas.updateOrCreateMany(
        ["coberturaId", "poliza"],
        amparosIn
      );

      return {
        mensaje: "Poliza guardada correctamente",
      };
    } catch (error) {
      console.log(error);
    }
  };



  guardarResponsabilidad = async (
    responsabilidad: Responsabilidad,
    poliza: number
  ) => {
    try {
      const respondabilidadBDExiste = await TblResponsabilidades.findBy(
        "res_poliza",
        poliza
      );
      if (respondabilidadBDExiste) {
        respondabilidadBDExiste.estableceResponsabilidadConId(responsabilidad);
        await respondabilidadBDExiste.save();
        return respondabilidadBDExiste;
      } else {
        const responsabilidadBD = new TblResponsabilidades();
        responsabilidadBD.establecerResponsabilidadDb(responsabilidad);
        responsabilidadBD.poliza = poliza;
        await responsabilidadBD.save();
        return responsabilidadBD;
      }
    } catch (error) {
      console.log(error);
    }
  };

  guardarArchivo = async (archivo: Archivo, poliza: number) => {
    try {
      const archivoBDExiste = await TblArchivo.findBy("arc_poliza", poliza);
      if (archivoBDExiste) {
        archivoBDExiste.estableceArchivoConId(archivo);
        await archivoBDExiste.save();
        return archivoBDExiste;
      } else {
        const archivoBD = new TblArchivo();
        archivoBD.establecerArchivoDb(archivo);
        archivoBD.poliza = poliza;
        await archivoBD.save();
        return archivoBD;
      }
    } catch (error) {
      console.log(error);
    }
  };

  async capacidad(datos: any, vigiladoId: string): Promise<any> {
    const { capacidades } = datos;

    if(capacidades){

    capacidades.map((capacidad) => {
      capacidad.vigiladoId = vigiladoId;
      return capacidad;
    });

    try {
      await TblCapacidades.updateOrCreateMany(
        ["modalidadId", "numero"],
        capacidades
      );
      this.servicioEstados.EnviadosSt(vigiladoId, 1);
      this.servicioEstados.Log(vigiladoId, 1);
      return {
        mensaje: "Modalidades guardadas correctamente",
      };
    } catch (error) {
      console.log(error);
      throw new Errores(
        `Se presento un problema al cargar las modalidades`,
        400
      );
    }
  }else{
    return {
      mensaje: "Enviado",
    };
  }

  }



  async obtenerVehiculos(params: any, id: string): Promise<any> {
    const { pagina, limite, vigiladoId, termino } = params;

    const placas = new Array();

    let query = Database.from("tbl_vehiculos as tv")
      .select(
        "tu.usn_identificacion as nit",
        "tu.usn_nombre as razon_social",
        "ttp.tpo_descripcion as tipo",
        "tp.pol_numero as numero_poliza",
        "tv.veh_placa as placa",
        "tv.veh_pasajeros as pasajeros",
        "tv.veh_vinculada as vinculada",
        "tv.veh_observacion as observacion",
      )
      .innerJoin("tbl_polizas as tp", (join) => {
        join
          .on("tp.pol_numero", "tv.veh_poliza")
          .andOn("tp.pol_tipo_poliza_id", "tv.veh_tipo_poliza");
      })
      .leftJoin(
        "tbl_tipos_polizas as ttp",
        "tp.pol_tipo_poliza_id",
        "ttp.tpo_id"
      )
      .leftJoin("tbl_usuarios as tu", "tp.pol_vigilado_id", "tu.usn_id");

    if (vigiladoId === id) {
      query = query.where("tu.usn_id", vigiladoId);
    }

    if (termino) {
      query.andWhere((subquery) => {
        subquery.orWhereRaw("LOWER(tu.usn_identificacion) LIKE LOWER(?)", [
          `%${termino}%`,
        ]);
        subquery.orWhereRaw("LOWER(tu.usn_nombre) LIKE LOWER(?)", [
          `%${termino}%`,
        ]);
        subquery.orWhereRaw("LOWER(ttp.tpo_descripcion) LIKE LOWER(?)", [
          `%${termino}%`,
        ]);
        subquery
          .orWhereRaw("LOWER(tv.veh_placa) LIKE LOWER(?)", [`%${termino}%`])
          .orWhereRaw("LOWER(CAST(tp.pol_numero AS TEXT)) LIKE LOWER(?)", [
            `%${termino}%`,
          ]);
      });
    }


    const datos = await query.paginate(pagina, limite);

    datos.forEach((dato) => {
      placas.push({
        nit: dato.nit,
        razon_social: dato.razon_social,
        tipo: dato.tipo,
        numero_poliza: dato.numero_poliza,
        placa: dato.placa,
        pasajeros: dato.pasajeros,
        vinculada: dato.vinculada,
        observacion: dato.observacion
      });
    });

    const datosSerializados = {
      ...datos,
      serialize() {
        return datos.toJSON();
      },
    };

    const paginacion =
      MapeadorPaginacionDB.obtenerPaginacion(datosSerializados);

    return { placas, paginacion };
  }

  async listarPolizas(params: any, id: string): Promise<any> {
    const { pagina, limite, poliza, tipoPoliza, fechaInicio, fechaFin, estado } =
      params;

    const polizas = new Array();

    let query = TblPolizas.query()
      .preload("tipoPoliza")
      .preload('aseguradoras')
      .where("pol_vigilado_id", id);

    if (poliza) {
      query.andWhere("pol_numero", poliza);
    }

    if (tipoPoliza) {
      query.andWhere("pol_tipo_poliza_id", tipoPoliza);
    }

    if (fechaInicio) {
      query.andWhere("pol_inicio_vigencia", fechaInicio);
    }

    if (fechaFin) {
      query.andWhere("pol_fin_vigencia", fechaFin);
    }
    let date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    if (estado && estado == 1) {
      query.andWhere("pol_fin_vigencia", ">=", formattedDate)
    }
    if (estado && estado == 0) {
      query.andWhere("pol_fin_vigencia", "<", formattedDate)
    }


    const datos = await query.paginate(pagina, limite);

    const vehiculosTodos = await TblVehiculos.query().andHas('polizas')
    .where({'veh_vinculada': true, 'veh_vigilado_id':id})
    .count('* as total')
    .first();

    const VehiculosContractualTodos = await TblVehiculos.query().andHas('polizas')
    .where({'veh_vinculada': true, 'veh_vigilado_id':id, 'veh_tipo_poliza':1})
    .count('* as total')
    .first();

    const VehiculosExtraContractualTodos = await TblVehiculos.query().andHas('polizas')
    .where({'veh_vinculada': true, 'veh_vigilado_id':id, 'veh_tipo_poliza':2})
    .count('* as total')
    .first();

    const totalVehiculos = vehiculosTodos?.$extras.total
    const totalVehiculosContractual = VehiculosContractualTodos?.$extras.total
    const totalVehiculosExtraContractual = VehiculosExtraContractualTodos?.$extras.total





    for (const dato of datos) {

      // Contar la cantidad de vehículos vinculados
      const cantidadVehiculos = await TblVehiculos.query()
        .where('veh_poliza', dato.numero)
        .andWhere('veh_tipo_poliza', dato.tipoPolizaId!)
        .andWhere('veh_vinculada', true)
        .count('* as total')
        .first();


      polizas.push({
        tipoPoliza: dato.tipoPoliza.descripcion,
        poliza: dato.numero,
        fechaCargue: dato.creado,
        fechaInicio: dato.inicioVigencia,
        fechaFin: dato.finVigencia,
        aseguradora: dato.aseguradoras.nombre,
        estadoPoliza: this.compararFecha(dato.finVigencia),
        cantidadVehiculos: cantidadVehiculos?.$extras.total
      });

    }

    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(datos);

    return { polizas, paginacion, totalVehiculos, totalVehiculosContractual, totalVehiculosExtraContractual };
  }



    async listarVehiculos(params: any, id:string): Promise<any> {
    const {pagina, limite, poliza, tipoPoliza, placa } = params

      const vehiculos= new Array();

    let query = TblVehiculos.query().where({'veh_poliza': poliza, 'veh_tipo_poliza':tipoPoliza, 'veh_vigilado_id': id})

    if (placa) {
      query.andWhere('veh_placa',placa)
    }



    const datos = await query.paginate(pagina, limite);

    datos.forEach((dato) => {
      vehiculos.push({
        placa: dato.placa,
        pasajeros: dato.pasajeros
      });
    });

    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(datos);

    return { vehiculos, paginacion };

  }

  async agregarVehiculos(params: any, id:string): Promise<any> {
    const {poliza, tipoPoliza, vehiculos } = params

    let mensaje = 'Vehículos agregados con éxito'
    let estado = 200
    let placasPolizas = ''

    for await (const vehiculo of vehiculos) {
    let polizaActiva = false;
      const vehiculosExiste = await TblVehiculos.query()
      .where({'veh_placa': vehiculo.placa, 'veh_vigilado_id':id, 'veh_vinculada':true, 'veh_tipo_poliza':tipoPoliza})
      .preload('polizas')
      .has('polizas')

      vehiculosExiste.forEach(veh => {
        const fechaActual = new Date();
        const fecha = new Date(veh.polizas.finVigencia);
        const hoy = new Date(`${fechaActual.getFullYear()}-${fechaActual.getMonth()+1}-${fechaActual.getDate()}`)
        const fin = new Date(`${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`)
            if (fin >= hoy) {
              polizaActiva = true
              placasPolizas += `(placa: ${vehiculo.placa} -> póliza: ${veh.polizas.numero}) `
            }

          });

       if (!polizaActiva) {
        const existe = await TblVehiculos.query().preload('polizas')
      .has('polizas')
      .where({'veh_placa':vehiculo.placa, 'veh_poliza': poliza, 'veh_tipo_poliza':tipoPoliza, 'veh_vigilado_id': id}).first()

      if(!existe){
        const vehiculoNew = new TblVehiculos();
        vehiculoNew.poliza = poliza;
        vehiculoNew.tipoPoliza = tipoPoliza;
        vehiculoNew.placa = vehiculo.placa;
        vehiculoNew.pasajeros = vehiculo.pasajeros;
        vehiculoNew.vigiladoId = id
        vehiculoNew.vinculada = true
        vehiculoNew.observacion = 'VINCULADA'
        await vehiculoNew.save()

      }else{
        existe.pasajeros = vehiculo.pasajeros
        existe.vinculada = true
        await existe.save()

      }
      const log = new TblLogVehiculos()
        log.tipoPoliza = tipoPoliza
        log.poliza = poliza
        log.placa = vehiculo.placa;
        log.vinculada = true
        log.vigiladoId = id
        log.observacion = 'VINCULADA'
        await log.save()
       }else{
        mensaje = `Algunas placas ya están vinculadas en una póliza activa: ${placasPolizas}`;
        estado = 201
       }



    }

    return { mensaje, estado }



  }

  async eliminarVehiculos(params: any, id:string): Promise<any> {
    const { poliza, tipoPoliza, placas } = params;

    if (!placas || placas.length === 0) {
      return { mensaje: 'No se proporcionaron placas para eliminar' };
    }

    // Buscar los vehículos que coinciden con las placas, poliza y tipoPoliza
    const vehiculosExistentes = await TblVehiculos.query()
      .whereIn('veh_placa', placas)
      .andWhere('veh_poliza', poliza)
      .andWhere('veh_tipo_poliza', tipoPoliza);

    if (vehiculosExistentes.length === 0) {
      return { mensaje: 'No se encontraron vehículos para eliminar' };
    }

    // Eliminar los vehículos encontrados
    await TblVehiculos.query()
      .whereIn('veh_placa', placas)
      .andWhere('veh_poliza', poliza)
      .andWhere('veh_tipo_poliza', tipoPoliza)
      .delete();

    return { mensaje: 'Vehículos fueron eliminados con éxito' };
  }

  async interoperabilidad(datos: any, nit: string, id: string): Promise<any> {
    const { poliza, tipoPoliza } = datos;
    const placasInteroperabilidad = this.consultarInteroperabilidad() //Reemplazar por el api de interoperabilidad
    const vehiculos = await TblVehiculos.query()
    .where({'veh_poliza': poliza,'veh_tipo_poliza': tipoPoliza, 'veh_vigilado_id':id, 'veh_vinculada': true})
    .select('veh_placa');


  const placasVehiculos = vehiculos.map(vehiculo => vehiculo.placa);
  const placasDisponibles = placasInteroperabilidad.filter(placa => !placasVehiculos.includes(placa));
  return { placasDisponibles };

  }

  async novedadesPoliza(datos: any): Promise<any> {
    const { poliza, tipoPoliza } = datos;
   const novedades = await TblLogVehiculos.query()
   .innerJoin('tbl_tipos_polizas', 'tbl_tipos_polizas.tpo_id', 'tbl_log_vehiculos.lov_tipo_poliza')
   .where({'poliza':poliza,'tipoPoliza': tipoPoliza})
   .select(
  'tbl_log_vehiculos.lov_tipo_poliza',
  'tbl_log_vehiculos.lov_creado',
  'tbl_log_vehiculos.lov_poliza',
  'tbl_log_vehiculos.lov_placa',
  'tbl_log_vehiculos.lov_vinculada',
  'tbl_log_vehiculos.lov_observacion',
  'tbl_log_vehiculos.lov_vigilado_id',
  'tbl_tipos_polizas.tpo_descripcion'
   )



   .orderBy('creacion','desc')
   return novedades.map(n =>{
    return {
      tipoPoliza: n.tipoPoliza,
      poliza: n.poliza,
      placa: n.placa,
      fechaActualizacion: n.creacion,
      estado:n.vinculada?'VINCULADA':'NO VINCULADA',
      observacion: n.observacion,
      tipopolizanombre:n.tpo_descripcion
     }
   })

  }


  async novedadesPolizapeccit(datos: any): Promise<any> {
    const { poliza, tipoPoliza } = datos;
   const q =  TblLogVehiculos.query()
   .innerJoin('tbl_tipos_polizas', 'tbl_tipos_polizas.tpo_id', 'tbl_log_vehiculos.lov_tipo_poliza')
   .where({'poliza':poliza,'tipoPoliza': tipoPoliza})
   .select(
    'tbl_log_vehiculos.lov_tipo_poliza',
    'tbl_log_vehiculos.lov_creado',
    'tbl_log_vehiculos.lov_poliza',
    'tbl_log_vehiculos.lov_placa',
    'tbl_log_vehiculos.lov_vinculada',
    'tbl_log_vehiculos.lov_observacion',
    'tbl_log_vehiculos.lov_vigilado_id',
    'tbl_tipos_polizas.tpo_descripcion'
   )
   .orderBy('creacion','desc')

   const array_novedades = await q.paginate(datos.page, datos.numero_items)


   return array_novedades;

  }


  public async listarAmparo(query:any){


    const q = TblDetallesPolizaCoberturas.query()
    .innerJoin('tbl_coberturas', 'tbl_coberturas.cob_id', 'tbl_detalles_poliza_coberturas.dpl_cobertura_id')
    .where( 'tbl_detalles_poliza_coberturas.dpl_poliza', query.poliza_id)
        .select(
        'tbl_detalles_poliza_coberturas.dpl_id',
        'tbl_detalles_poliza_coberturas.dpl_poliza',
        'tbl_detalles_poliza_coberturas.dpl_cobertura_id',
        'tbl_detalles_poliza_coberturas.dpl_valor_asegurado',
        'tbl_detalles_poliza_coberturas.dpl_limite',
        'tbl_detalles_poliza_coberturas.dpl_deducible',
        'tbl_coberturas.cob_descripcion as cobertura_descricpion',
        'tbl_coberturas.cob_nombre as cobertura_nombre',
        'tbl_coberturas.tipo',
      )
    .orderBy('tbl_coberturas.tipo','asc')

    const array_amparos = q.paginate(query.page, query.numero_items);

return array_amparos
}


async consultarResponsabilidad(poliza_id: string) {
  let idNumerico = Number(poliza_id);
  const obj_responsabilidad = await TblResponsabilidades
    .query()
    .innerJoin('tbl_polizas', 'tbl_responsabilidades.res_poliza', 'tbl_polizas.pol_numero')
    .innerJoin('tbl_tipos_polizas', 'tbl_polizas.pol_tipo_poliza_id', 'tbl_tipos_polizas.tpo_id')
    .select(

      'tbl_tipos_polizas.tpo_nombre as tipo_poliza_nombre',
      'tbl_tipos_polizas.tpo_descripcion as tipo_poliza_descripcion',
      'tbl_responsabilidades.res_id',
      'tbl_responsabilidades.res_poliza',
      'tbl_responsabilidades.res_fecha_constitucion',
      'tbl_responsabilidades.res_resolucion',
      'tbl_responsabilidades.res_fecha_resolucion',
      'tbl_responsabilidades.res_valor_reserva',
      'tbl_responsabilidades.res_fecha_reserva',
      'tbl_responsabilidades.res_informacion',
      'tbl_responsabilidades.res_operacion',
      'tbl_responsabilidades.res_valor_cumplimiento_uno',
      'tbl_responsabilidades.res_valor_cumplimiento_dos',
      'tbl_responsabilidades.res_creado',
      'tbl_responsabilidades.res_actualizado'


    )
    .where('res_poliza', idNumerico)
    .first();

  return obj_responsabilidad;
}





  generarPlaca() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';

    // Generar 3 letras aleatorias
    let placa = '';
    for (let i = 0; i < 3; i++) {
      placa += letras.charAt(Math.floor(Math.random() * letras.length));
    }

    // Generar 3 números aleatorios
    for (let i = 0; i < 3; i++) {
      placa += numeros.charAt(Math.floor(Math.random() * numeros.length));
    }

    return placa;
  }

  consultarInteroperabilidad() {
    // Definir el número de placas aleatorias entre 10 y 15
    const cantidad = Math.floor(Math.random() * (15 - 10 + 1)) + 10;
    const placas = new Array();

    // Generar las placas
    for (let i = 0; i < cantidad; i++) {
      placas.push(this.generarPlaca());
    }

    return placas;
  }


  async gestionarPlaca(placa: string, id:string): Promise<any> {

   /* const vehiculos = await TblVehiculos.query().preload('polizas', pol =>{
    pol.preload('aseguradoras')
   }).where({'placa':placa, 'vigiladoId': id}) */

   const vehiculos = await Database
   .from('tbl_vehiculos as tv')
   .leftJoin('tbl_polizas as po', function () {
     this.on('tv.veh_poliza', '=', 'po.pol_numero')
     .on('tv.veh_tipo_poliza', '=', 'po.pol_tipo_poliza_id')

    })
    .leftJoin('tbl_aseguradoras as ase', 'ase.ase_id', 'po.pol_aseguradora_id')
   .select(
     'tv.veh_id as id',
     'po.pol_numero as poliza',
     'ase.ase_nombre as aseguradora',
     'po.pol_inicio_vigencia as inicioVigencia',
     'po.pol_fin_vigencia as finVigencia',
     'po.pol_creado as creado',
     'tv.veh_placa as placa',
     'tv.veh_vinculada as vinculada',
     'tv.veh_observacion as observacion',
     'po.pol_tipo_poliza_id as tipoPoliza'
   )
   .where('tv.veh_placa', placa)
   .andWhere('po.pol_vigilado_id', id)
   .andWhere('po.pol_vigilado_id', id)
   .orderBy('veh_creado', 'desc')

   const contractualDb = vehiculos.find(c => c.tipoPoliza == 1)
   const extraContractualDb = vehiculos.find(c => c.tipoPoliza == 2)


   let contractual:any
   let extraContractual:any

   const fechaActual = new Date();
    if(contractualDb){
      contractual = {
        id:contractualDb.id,
        poliza: contractualDb?.poliza,
        estadoPoliza: this.compararFecha(contractualDb?.finVigencia),
        fechaCargue: contractualDb.creado,
        fechaInicio: contractualDb.inicioVigencia,
        fechaFin: contractualDb.finVigencia,
        aseguradora: contractualDb.nombre,
        vinculada: contractualDb.vinculada,
        observacion: (contractualDb.vinculada)?'':contractualDb.observacion,
        existe:true,
        mensaje: this.mensajes(contractualDb?.finVigencia)
      }
    }else{
      contractual = {
        existe:false,
        mensaje: 'NO SE REPORTA INFORMACIÓN'
      }
    }

    if(extraContractualDb){
      extraContractual = {
        id:extraContractualDb.id,
        poliza: extraContractualDb?.poliza,
        estadoPoliza: this.compararFecha(extraContractualDb?.finVigencia),
        fechaCargue: extraContractualDb.creado,
        fechaInicio: extraContractualDb.inicioVigencia,
        fechaFin: extraContractualDb.finVigencia,
        aseguradora: extraContractualDb.nombre,
        vinculada: extraContractualDb.vinculada,
        observacion:(extraContractualDb.vinculada)?'':extraContractualDb.observacion,
        existe:true,
        mensaje: this.mensajes(extraContractualDb?.finVigencia)
      }
    }else{
      extraContractual = {
        existe:false,
        mensaje: 'NO SE REPORTA INFORMACIÓN'
      }
    }

   // Novedades
   const novedadesDb = await TblLogVehiculos.query().where({'placa':placa,'vigiladoId': id}).orderBy('creacion','desc')
   const novedades = novedadesDb.map(n =>{
    return {
      tipoPoliza: n.tipoPoliza,
      poliza: n.poliza,
      placa: n.placa,
      fechaActualizacion: n.creacion,
      estado:n.vinculada?'VINCULADA':'NO VINCULADA',
      observacion: n.observacion
     }
   })

   // Historial
   const polizas = await Database
   .from('tbl_polizas as po')
   .leftJoin('tbl_tipos_polizas as ttp', 'ttp.tpo_id', 'po.pol_tipo_poliza_id')
   .leftJoin('tbl_aseguradoras as ase', 'ase.ase_id', 'po.pol_aseguradora_id')
   .leftJoin('tbl_vehiculos as tv', function () {
     this.on('tv.veh_poliza', '=', 'po.pol_numero')
       .on('tv.veh_tipo_poliza', '=', 'po.pol_tipo_poliza_id')
   })
   .select(
     'po.pol_numero as poliza',
     'ttp.tpo_descripcion as tipo_poliza',
     'ase.ase_nombre as aseguradora',
     'po.pol_inicio_vigencia as inicio_vigencia',
     'po.pol_fin_vigencia as fin_vigencia',
     'po.pol_creado as creado',
     'tv.veh_placa as placa'
   )
   .where('tv.veh_placa', placa)
   .andWhere('po.pol_vigilado_id', id)

 const historial: any[] = [];

 // Procesa los resultados de la consulta
 for (const dato of polizas) {
   historial.push({
     tipoPoliza: dato.tipo_poliza,
     poliza: dato.poliza,
     placa: dato.placa,
     estadoPoliza: this.compararFecha(dato.fin_vigencia),
     fechaCargue: dato.creado,
     fechaInicio: dato.inicio_vigencia,
     fechaFin: dato.fin_vigencia,
     aseguradora: dato.aseguradora,
   });
 }


   return {contractual, extraContractual, novedades, historial}



  }

  mensajes = (fechaFin: string):string =>{
    const fechaActual = new Date();
    const fecha = new Date(fechaFin);

    const hoy = new Date(`${fechaActual.getFullYear()}-${fechaActual.getMonth()+1}-${fechaActual.getDate()}`)
    const fin = new Date(`${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`)


    if( fin < hoy){
      const nVencida = hoy.getTime() - fin.getTime()
      const diferenciaDias = Math.floor(nVencida / (1000 * 60 * 60 * 24));

      return `LA COBERTURA DE SU PÓLIZA SE ENCUENTRA VENCIDA. (${diferenciaDias} DÍAS)`
    }else if(fin > hoy){
      return ''
    }else{
      return 'HOY VENCE LA COBERTURA DE SU PÓLIZA'
    }

  }

  compararFecha = (fechaFin: string): string =>{
    const fechaActual = new Date();
    const fecha = new Date(fechaFin);

    const hoy = new Date(`${fechaActual.getFullYear()}-${fechaActual.getMonth()+1}-${fechaActual.getDate()}`)
    const fin = new Date(`${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`)


    return fin < hoy ? 'INACTIVA' : 'ACTIVA';
  }

  async desvincularPlaca(id: number, motivo:string): Promise<any> {
    const vehiculo = await TblVehiculos.findBy('id', id)
    if(vehiculo){
    vehiculo.vinculada = false
    vehiculo.observacion = motivo
    await vehiculo.save()

    const log = new TblLogVehiculos()
    log.tipoPoliza = vehiculo.tipoPoliza!
    log.poliza = vehiculo.poliza
    log.placa = vehiculo.placa;
    log.vinculada = false
    log.vigiladoId = vehiculo.vigiladoId
    log.observacion = motivo
    await log.save()

    return {mensaje:'Placa desvinculada'}
    }
    return {mensaje:'no existe la placa'}
  }

  async actualizarPoliza(datosPoliza: any) {
    const { numeroPoliza, idTipoPoliza, fechaInicio, fechaFin, vigiladoId, caratula, nombreOriginal, ruta } = datosPoliza;
    try {
      const polizaDB = await TblPolizas.query().where('numero', numeroPoliza).andWhere('tipoPolizaId', idTipoPoliza).first()
      const archivoPoliza = await TblArchivo.query().where('poliza', numeroPoliza).first()
      if (!polizaDB) {
        return { mensaje: `No existe la póliza con número ${numeroPoliza}`};
      }
      const historialRenovacion = {
        vigiladoId,
        numeroPoliza,
        inicioVigenciaOld: polizaDB?.inicioVigencia,
        inicioVigenciaNew: fechaInicio,
        finVigenciaOld: polizaDB?.finVigencia,
        finVigenciaNew: fechaFin,
        caratulaOld: archivoPoliza?.nombre,
        caratulaNew: caratula
      }
      const nuevaPoliza = {
        numero: polizaDB.numero,
        inicioVigencia:  fechaInicio,
        finVigencia:  fechaFin,
        aseguradoraId:  polizaDB.aseguradoraId,
        tipoPolizaId:  polizaDB.tipoPolizaId,
        responsabilidad:  polizaDB.responsabilidad,
        estado:  polizaDB.estado
      }

      const nuevoArchivo = {
        poliza: numeroPoliza,
        nombre: caratula,
        nombreOriginal: nombreOriginal,
        ruta: ruta,
      }
      const historialRenovacionDb = new TblHistorialRenovacion();
      historialRenovacionDb.establecerHistorialRenovacionDb(historialRenovacion);
      await historialRenovacionDb.save();
      console.log("registro exitoso");

      polizaDB.establecePolizaConId(nuevaPoliza)
      await polizaDB.save();
      archivoPoliza?.estableceArchivoConId(nuevoArchivo)
      await archivoPoliza?.save();

      return polizaDB
    } catch (error) {
      console.error('Error en la actualización:', error);
      return { mensaje: `Se presento un error en la actualización, intente nuevamente. ${error}` };
    }
  }

}
