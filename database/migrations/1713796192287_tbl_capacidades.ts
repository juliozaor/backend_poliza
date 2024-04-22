import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_capacidades'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('cap_numero')
      table.date('cap_inicio_vigencia')
      table.string('cap_nombre_archivo',200)
      table.string('cap_nombre_original_archivo',200)
      table.string('cap_ruta_archivo',200)
      table.integer('cap_modalidad_id').references('mod_id').inTable('tbl_modalidades')
      table.timestamp('cap_creado', { useTz: true })
      table.timestamp('cap_actualizado', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
