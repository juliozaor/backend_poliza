import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_modelos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mod_id')
      table.string('mod_nombre', 150)
      table.boolean('mod_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
