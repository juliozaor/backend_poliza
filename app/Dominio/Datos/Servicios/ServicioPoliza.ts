/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioPoliza } from 'App/Dominio/Repositorios/RepositorioPoliza'
import {Poliza}  from 'App/Dominio/Datos/Entidades/Poliza';
import Database from '@ioc:Adonis/Lucid/Database';


export class ServicioPoliza {
  constructor(private repositorio: RepositorioPoliza) { }

  public async obtenerPolizasPorUsuario(usn_identificacion: string) {
    const polizas = await this.repositorio.buscarPorVigiladoId(usn_identificacion);
    return polizas.length > 0 ? polizas : [];
  }

  public async filtrarPolizas(
    usn_identificacion: string,
    pol_numero?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<any> {
    return this.repositorio.listarPolizasporNumero(usn_identificacion, pol_numero, page, limit);
  }

  async visualizar(datos: any, vigiladoId: string): Promise<any> {
    return this.repositorio.visualizar(datos, vigiladoId);
  }

  async guardar(datos: any, vigiladoId: string): Promise<any> {
    return this.repositorio.guardar(datos, vigiladoId);
  }

  async capacidad(datos: any, vigiladoId: string): Promise<any> {
    return this.repositorio.capacidad(datos, vigiladoId);
  }

  async obtenerVehiculos(params: any, id: string): Promise<any> {
    return this.repositorio.obtenerVehiculos(params, id);
  }

  async listarPolizas(datos: any, vigiladoId: string): Promise<any> {
    return this.repositorio.listarPolizas(datos, vigiladoId);
  }

  public async obtenerDetallePoliza(pol_id: number) {
    try {

      const poliza = await Database
        .from('tbl_polizas')
        .where('pol_id', pol_id)
        .first();

      return poliza;
    } catch (error) {

      throw new Error('Error al obtener la póliza: ' + error.message);
    }
  }

  async listarVehiculos(datos: any, vigiladoId: string): Promise<any> {
    return this.repositorio.listarVehiculos(datos, vigiladoId);
  }

  async eliminarVehiculos(datos: any, vigiladoId: string): Promise<any> {
    return this.repositorio.eliminarVehiculos(datos, vigiladoId);
  }

  async agregarVehiculos(datos: any, vigiladoId: string): Promise<any> {
    return this.repositorio.agregarVehiculos(datos, vigiladoId);
  }

  async interoperabilidad(datos: any, nit: string, id: string): Promise<any> {
    return this.repositorio.interoperabilidad(datos, nit, id);
  }

  async novedadesPoliza(datos: any): Promise<any> {
    return this.repositorio.novedadesPoliza(datos);
  }
  async novedadesPolizapeccit(datos: any): Promise<any> {
    return this.repositorio.novedadesPolizapeccit(datos);
  }

  async gestionarPlaca(placa: string, vigiladoId: string): Promise<any> {
    return this.repositorio.gestionarPlaca(placa, vigiladoId);
  }

  async desvincularPlaca(id: number, motivo: string): Promise<any> {
    return this.repositorio.desvincularPlaca(id, motivo);
  }
  async listarAmparo(datos: any): Promise<any> {
    return this.repositorio.listarAmparo(datos);
  }

  async consultarResponsabilidad(datos: any): Promise<any> {
    return this.repositorio.consultarResponsabilidad(datos.poliza_id);
  }

  async actualizarPoliza(datos: any): Promise<any> {
    return this.repositorio.actualizarPoliza(datos);
  }

}
