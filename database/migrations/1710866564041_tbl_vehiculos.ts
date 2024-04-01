import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_vehiculos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('veh_id')
      table.integer('veh_poliza_id').references('pol_id').inTable('tbl_polizas')
      table.string('veh_placa', 6)
      table.integer('veh_pasajeros', 2)
      table.string('veh_marca')
      table.string('veh_modelo')
      table.string('veh_tipo_servicio')
      table.string('veh_clase_servicio')
      table.timestamp('veh_creado', { useTz: true })
      table.timestamp('veh_actualizado', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
