const SqliteDriver = require('./sqlite.db-driver')
const Migrate = require('./migrate')

class LocalDb {
  static getInstance() {
    return new SqliteDriver()
  }
}

module.exports.migrate = Migrate
module.exports.database = LocalDb
