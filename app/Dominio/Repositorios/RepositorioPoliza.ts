export interface RepositorioPoliza {
  visualizar(modalidadId:number, polizaId:number, aseguradoraId: number): Promise<any>
}
