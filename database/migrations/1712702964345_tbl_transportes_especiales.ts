import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_transportes_especiales'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tre_id')
     
      table.integer('tre_automovil_a', 3).comment('Automovil asignada')
      table.integer('tre_campero_a', 3).comment('Camperos asignada')
      table.integer('tre_van_a', 3).comment('Camioneta van asignada')
      table.integer('tre_doble_a', 3).comment('Doble cabina asignada')
      table.integer('tre_microbus_a', 3).comment('MIcrobus asignada')
      table.integer('tre_buseta_a', 3).comment('Buseta asignada')
      table.integer('tre_bus_a', 3).comment('Bus asignada')

      table.integer('tre_automovil_v', 3).comment('Automovil vinculada')
      table.integer('tre_campero_v', 3).comment('Camperos vinculada')
      table.integer('tre_van_v', 3).comment('Camioneta van vinculada')
      table.integer('tre_doble_v', 3).comment('Doble cabina vinculada')
      table.integer('tre_microbus_v', 3).comment('MIcrobus vinculada')
      table.integer('tre_buseta_v', 3).comment('Buseta vinculada')
      table.integer('tre_bus_v', 3).comment('Bus vinculada')

      table.boolean('tre_estado').defaultTo(true)
      table.uuid('tre_vigilado_id').references('usn_id').inTable('tbl_usuarios')
      table.timestamp('tre_creado', { useTz: true })
      table.timestamp('tre_actualizado', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
