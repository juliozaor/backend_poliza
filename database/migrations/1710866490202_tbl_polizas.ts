import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_polizas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('pol_id')
      table.bigInteger('pol_numero')
      table.integer('pol_aseguradora_id').references('ase_id').inTable('tbl_aseguradoras')
      table.integer('pol_modalidad_id').references('mod_id').inTable('tbl_modalidades')
      table.uuid('pol_vigilado_id').references('usn_id').inTable('tbl_usuarios')
      table.date('pol_inicio_vigencia')
      table.date('pol_fin_vigencia')
      table.boolean('pol_estado').defaultTo(true)
      table.timestamp('pol_creado', { useTz: true })
      table.timestamp('pol_actualizado', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
