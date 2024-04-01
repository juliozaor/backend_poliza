import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import TblCoberturas from "App/Infraestructura/Datos/Entidad/Coberturas";

export default class extends BaseSeeder {
  public async run() {
    await TblCoberturas.createMany([
      {
        id: 1,
        nombre: "Muerte Accidental",
        descripcion:'Coberturas y/o amparos básicos - Valor Asegurado - Limites - Deducible',
        tipoAmparo:1,
        tipoPoliza:1,
        orden: 1,
      },{
        id: 2,
        nombre: "Incapacidad Temporal",
        descripcion:'Coberturas y/o amparos básicos - Valor Asegurado - Limites - Deducible',
        tipoAmparo:1,
        tipoPoliza:1,
        orden: 2,
      },{
        id: 3,
        nombre: "Incapacidad Permanente",
        descripcion:'Coberturas y/o amparos básicos - Valor Asegurado - Limites - Deducible',
        tipoAmparo:1,
        tipoPoliza:1,
        orden: 3,
      },{
        id: 4,
        nombre: "Gastos Médicos Hospitalarios",
        descripcion:'Coberturas y/o amparos básicos - Valor Asegurado - Limites - Deducible',
        tipoAmparo:1,
        tipoPoliza:1,
        orden: 4,
      }, {
        id: 5,
        nombre: "Amparo patrimonial",
        descripcion:'Coberturas y/o amparos adicionales - Valor Asegurado - Limites - Deducible',
        tipoAmparo:2,
        tipoPoliza:1,
        orden: 5,
      },{
        id: 6,
        nombre: "Asistencia Juridica en proceso penal y civil",
        descripcion:'Coberturas y/o amparos adicionales - Valor Asegurado - Limites - Deducible',
        tipoAmparo:2,
        tipoPoliza:1,
        orden: 6,
      },{
        id: 7,
        nombre: "Perjuicios patrimoniales y extrapatrimoniales",
        descripcion:'Coberturas y/o amparos adicionales - Valor Asegurado - Limites - Deducible',
        tipoAmparo:2,
        tipoPoliza:1,
        orden: 7,
      },{
        id: 8,
        nombre: "Otras",
        descripcion:'Coberturas y/o amparos adicionales - Valor Asegurado - Limites - Deducible',
        tipoAmparo:2,
        tipoPoliza:1,
        orden: 8,
      },

      {
        id: 9,
        nombre: "Daños a bienes de terceros",
        descripcion:'Coberturas y/o amparos básicos - Valor Asegurado - Limites - Deducible',
        tipoAmparo:1,
        tipoPoliza:2,
        orden: 9,
      },{
        id: 10,
        nombre: "Lesiones o Muerte a 1 persona",
        descripcion:'Coberturas y/o amparos básicos - Valor Asegurado - Limites - Deducible',
        tipoAmparo:1,
        tipoPoliza:2,
        orden: 10,
      },{
        id: 11,
        nombre: "Lesiones o Muerte a 2 o mas personas",
        descripcion:'Coberturas y/o amparos básicos - Valor Asegurado - Limites - Deducible',
        tipoAmparo:1,
        tipoPoliza:2,
        orden: 11,
      },{
        id: 12,
        nombre: "Amparo patrimonial",
        descripcion:'Coberturas y/o amparos adicionales - Valor Asegurado - Limites - Deducible',
        tipoAmparo:2,
        tipoPoliza:2,
        orden: 12,
      },{
        id: 13,
        nombre: "Asistencia Juridica en proceso penal y civil",
        descripcion:'Coberturas y/o amparos adicionales - Valor Asegurado - Limites - Deducible',
        tipoAmparo:2,
        tipoPoliza:2,
        orden: 13,
      },{
        id: 14,
        nombre: "Perjuicios patrimoniales y extrapatrimoniales",
        descripcion:'Coberturas y/o amparos adicionales - Valor Asegurado - Limites - Deducible',
        tipoAmparo:2,
        tipoPoliza:2,
        orden: 14,
      },{
        id: 15,
        nombre: "Otras",
        descripcion:'Coberturas y/o amparos adicionales - Valor Asegurado - Limites - Deducible',
        tipoAmparo:2,
        tipoPoliza:2,
        orden: 15,
      },
    ]);
  }
}
