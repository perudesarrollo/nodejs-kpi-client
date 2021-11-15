const Validation = require('../middlewares/validators/client.validation')
module.exports = (Database, Joi) => ({
  create: async (payload) => {
    await Validation(Joi).create(payload)
    const db = await Database.getInstance()
    const created = await db.insertTable(payload, 'clients')
    return created
  },
  list: async (payload) => {
    const db = await Database.getInstance()
    const list = await db.listTable('clients')

    if (list) {
      const maps = withAge(list)
      return maps
    }
    return false
  },
  kpi: async (payload) => {
    const db = await Database.getInstance()
    const list = await db.listTable('clients')
    if (list) {
      const maps = withAge(list)
      const ages = maps.map((c) => c.age)
      return {
        average_age: avgAge(ages),
        standard_deviation: standardDeviation(ages),
      }
    }
    return {
      average_age: 0,
      standard_deviation: 0,
    }
  },
})
const withAge = (arr) =>
  arr.map((c) => ({
    ...c,
    age: age(c.birth_date),
    death: death(c.birth_date),
  }))

const age = (birth_date) =>
  new Date().getFullYear() - new Date(birth_date).getFullYear()
const death = (birth_date, promedio = 75) => {
  const ageT = age(birth_date)
  return new Date().getFullYear() - (ageT - promedio)
}

const avgAge = (arr) => arr.reduce((acc, val) => acc + val, 0) / arr.length

const standardDeviation = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length
  return Math.sqrt(
    arr
      .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
      .reduce((acc, val) => acc + val, 0) /
    (arr.length - (usePopulation ? 0 : 1))
  )
}
