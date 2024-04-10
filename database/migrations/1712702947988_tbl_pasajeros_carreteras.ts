import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_pasajeros_carreteras'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('pac_id')
     
      table.integer('pac_minimo_a', 3).comment('Mínima grupo a')
      table.integer('pac_maximo_a', 3).comment('Máxima grupo a')
      table.integer('pac_minimo_b', 3).comment('Mínima grupo b')
      table.integer('pac_maximo_b', 3).comment('Máxima grupo b')
      table.integer('pac_minimo_c', 3).comment('Mínima grupo c')
      table.integer('pac_maximo_c', 3).comment('Máxima grupo c')
      table.integer('pac_grupo_a', 3).comment('Grupo a')
      table.integer('pac_grupo_b', 3).comment('Grupo b')
      table.integer('pac_grupo_v', 3).comment('Grupo c')

      table.boolean('pac_estado').defaultTo(true)
      table.uuid('pac_vigilado_id').references('usn_id').inTable('tbl_usuarios')
      table.timestamp('pac_creado', { useTz: true })
      table.timestamp('pac_actualizado', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
