import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_estados_vigilados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('esv_id')
      table.bigInteger('esv_estado').references('est_id').inTable('tbl_estados')
      table.uuid('esv_vigilado_id').references('usn_id').inTable('tbl_usuarios')
      table.timestamp('esv_creado', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
