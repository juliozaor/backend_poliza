import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_historial_de_renovaciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('hdr_id')
      table.string('hdr_vigilado_id')
      table.integer('hdr_numero_poliza')
      table.date('hdr_fecha_inicio_old')
      table.date('hdr_fecha_inicio_new')
      table.date('hdr_fecha_fin_old')
      table.date('hdr_fecha_fin_new')
      table.string('hdr_caratula_old', 200)
      table.string('hdr_caratula_new',200)
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
