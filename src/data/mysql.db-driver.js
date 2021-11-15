class MysqlDriver {
  constructor() {
    this.cnn = false
  }

  getConnection() {
    const cnn = require('knex')({
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'root1234',
        database: 'lurobus_gestion',
      },
      pool: { min: 5, max: 10 },
    })
    this.cnn = cnn
    return cnn
  }

  async insertTable(object, table) {
    const cnn = this.cnn || (await this.getConnection())
    return await cnn(table).insert([object])
  }

  async listTable(table) {
    const cnn = this.cnn || (await this.getConnection())
    return await cnn(table)
  }
}

module.exports = MysqlDriver
