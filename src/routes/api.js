const Joi = require('joi').extend(require('@joi/date'))
const { successResponse, failResponse } = require('../helpers/methods')
const Client = require('../controllers/client.controller')
const { database, migrate } = require('../data')

const handleClient = Client(database, Joi)

module.exports = function (app) {
  app.get('/seed', async (req, res) => {
    const db = await database.getInstance()
    const handleMigrate = migrate(await db.getConnection())
    res.send({
      down: await handleMigrate.down(),
      up: await handleMigrate.up(),
      seed: await handleMigrate.seed(),
    })
  })

  // clientes
  app.get('/cliente', async (req, res) => {
    try {
      const list = await handleClient.list(req.body)
      res.send(successResponse('success', { clients: list }))
    } catch (error) {
      console.log('error:::', error)
      res.status(400).send(failResponse(error.message))
    }
  })
  app.get('/cliente/kpi', async (req, res) => {
    try {
      const kpi = await handleClient.kpi(req.body)
      res.send(successResponse('success', { kpi }))
    } catch (error) {
      console.log('error:::', error)
      res.status(400).send(failResponse(error.message))
    }
  })
  app.post('/cliente', async (req, res) => {
    try {
      const created = await handleClient.create(req.body)
      res.send(successResponse('success', { created, client: req.body }))
    } catch (error) {
      console.log('error:::', error)
      res.status(400).send(failResponse(error.message))
    }
  })
}
