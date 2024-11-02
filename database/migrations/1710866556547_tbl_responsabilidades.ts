import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_responsabilidades'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('res_id')
      table.bigInteger('res_poliza').references('pol_numero').inTable('tbl_polizas')
      table.date('res_fecha_constitucion')
      table.integer('res_resolucion')
      table.date('res_fecha_resolucion')
      table.integer('res_valor_reserva')
      table.date('res_fecha_reserva')
      table.text('res_informacion')
      table.integer('res_operacion')
      table.integer('res_valor_cumplimiento_uno')
      table.integer('res_valor_cumplimiento_dos')
      table.timestamp('res_creado', { useTz: true })
      table.timestamp('res_actualizado', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
