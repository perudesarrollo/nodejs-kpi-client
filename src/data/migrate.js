const table = 'clients'
const migrate = (db) => ({
  up: async () =>
    await db.schema.createTable(table, (table) => {
      table.increments().primary()
      table.string('name').notNullable()
      table.string('last_name').notNullable()
      table.datetime('birth_date').notNullable()
      table.timestamps()
    }),
  down: async () => {
    const exiting = await db.schema.hasTable(table)
    if (exiting) {
      return await db.schema.dropTable(table)
    }
  },
  seed: async () =>
    await db(table).insert([
      { name: 'Max', last_name: 'Palomino', birth_date: '2012-02-02' },
      { name: 'Max2', last_name: 'Mendoza', birth_date: '2013-06-03' },
      { name: 'Max3', last_name: 'Meza', birth_date: '2014-03-12' },
    ]),
})

module.exports = migrate
