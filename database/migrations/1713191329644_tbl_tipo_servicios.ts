import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_tipo_servicios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tis_id')
      table.string('tis_nombre', 150)
      table.boolean('tis_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
