import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_vehiculos'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('veh_vinculada').defaultTo(true)
      table.text('veh_observacion').defaultTo('CARGUE INICIAL')

  })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('veh_vinculada')
      table.dropColumn('veh_observacion')  
  })
  }
}
