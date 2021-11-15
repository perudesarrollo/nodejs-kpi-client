class SqliteDriver {
  constructor() {
    this.cnn = false
  }

  getConnection() {
    const cnn = require('knex')({
      client: 'sqlite3',
      connection: {
        filename: './mydb.sqlite',
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
