import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_polizas_modalidades'  

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') 

      
      table.integer('pol_id')
        .unsigned()
        .references('pol_id')
        .inTable('tbl_polizas')
        .onDelete('RESTRICT')  
      
      
      table.integer('modpol_id')
        .unsigned()
        .references('modpol_id')
        .inTable('tbl_modalidadpolizas')
        .onDelete('RESTRICT')  
      
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
