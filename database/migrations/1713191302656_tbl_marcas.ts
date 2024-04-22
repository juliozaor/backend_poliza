import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_marcas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mar_id')
      table.string('mar_nombre', 150)
      table.boolean('mar_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
