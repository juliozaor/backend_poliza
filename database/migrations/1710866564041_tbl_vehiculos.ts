import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_vehiculos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('veh_id')
      table.string('veh_placa', 6)
      table.integer('veh_pasajeros', 2)
      table.bigInteger('veh_poliza')
      table.timestamp('veh_creado', { useTz: true })
      table.timestamp('veh_actualizado', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
