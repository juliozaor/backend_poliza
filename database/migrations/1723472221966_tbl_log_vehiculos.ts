import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_log_vehiculos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('lov_id')
      table.integer('lov_tipo_poliza')
      table.bigInteger('lov_poliza')
      table.string('lov_placa',6)
      table.boolean('lov_vinculada')
      table.text('lov_observacion')
      table.timestamp('lov_creado', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
