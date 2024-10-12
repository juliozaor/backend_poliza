import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_polizas_modalidades'  // Cambiado el nombre de la tabla

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // ID único para la tabla

      // Clave foránea a 'tbl_polizas', con restricción de eliminación
      table.integer('pol_id')
        .unsigned()
        .references('pol_id')
        .inTable('tbl_polizas')
        .onDelete('RESTRICT')  // Evita eliminar si hay relaciones
      
      // Clave foránea a 'tbl_modalidadpolizas', con restricción de eliminación
      table.integer('modpol_id')
        .unsigned()
        .references('modpol_id')
        .inTable('tbl_modalidadpolizas')
        .onDelete('RESTRICT')  // Evita eliminar si hay relaciones
      
      // Timestamps para auditoría
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
