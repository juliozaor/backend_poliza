import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_detalles_poliza_coberturas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('dpl_id')
      table.integer('dpl_poliza_id').references('pol_id').inTable('tbl_polizas')
      table.integer('dpl_cobertura_id').references('cob_id').inTable('tbl_coberturas')
      table.integer('dpl_valor_asegurado',3)
      table.integer('dpl_limite',3)
      table.integer('dpl_deducible',3)
      table.timestamp('dpl_creado', { useTz: true })
      table.timestamp('dpl_actualizado', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
