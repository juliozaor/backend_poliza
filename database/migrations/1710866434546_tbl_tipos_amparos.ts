import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_tipos_amparos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tam_id')
      table.string('tam_nombre',200)
      table.integer('tam_orden', 3)
      table.boolean('tam_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
