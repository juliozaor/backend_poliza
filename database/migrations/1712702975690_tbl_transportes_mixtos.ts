import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_transportes_mixtos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('trm_id')
     
      table.integer('trm_campero_a', 3).comment('Camperos asignada')
      table.integer('trm_doble_a', 3).comment('Doble cabina asignada')
      table.integer('trm_microbus_a', 3).comment('MIcrobus asignada')
      table.integer('trm_buseta_a', 3).comment('Buseta asignada')
      table.integer('trm_bus_a', 3).comment('Bus asignada')
      table.integer('trm_bus_escalera_a', 3).comment('Bus escalera asignada')
      table.integer('trm_chiva_a', 3).comment('Chivas asignada')

      table.integer('trm_campero_v', 3).comment('Camperos vinculada')
      table.integer('trm_doble_v', 3).comment('Doble cabina vinculada')
      table.integer('trm_microbus_v', 3).comment('MIcrobus vinculada')
      table.integer('trm_buseta_v', 3).comment('Buseta vinculada')
      table.integer('trm_bus_v', 3).comment('Bus vinculada')
      table.integer('trm_bus_escalera_v', 3).comment('Bus escalera vinculada')
      table.integer('trm_chiva_v', 3).comment('Chivas vinculada')

      table.boolean('trm_estado').defaultTo(true)
      table.uuid('trm_vigilado_id').references('usn_id').inTable('tbl_usuarios')
      table.timestamp('trm_creado', { useTz: true })
      table.timestamp('trm_actualizado', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
