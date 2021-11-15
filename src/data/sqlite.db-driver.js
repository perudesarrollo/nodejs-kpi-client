const path = require('path')
class SqliteDriver {
  constructor() {
    this.cnn = false
  }

  getConnection() {
    console.log(__dirname)
    const cnn = require('knex')({
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '../..', 'clients.sqlite3'),
      },
      useNullAsDefault: true,
      debug: true,
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

module.exports = SqliteDriver
