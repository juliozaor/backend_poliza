import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_estados_polizas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('esp_id')
      table.bigInteger('esp_estado').references('est_id').inTable('tbl_estados')
      table.bigInteger('esp_poliza').references('pol_numero').inTable('tbl_polizas')
      table.timestamp('esp_creado', { useTz: true })
      table.timestamp('esp_actualizado', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
