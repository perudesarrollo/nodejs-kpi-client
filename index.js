const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
require('dotenv').config()
const errorMiddleware = require('./src/middlewares/error.middleware')

const express = require('express')
const parser = require('body-parser')
const app = express()

// application/x-www-form-urlencoded
app.use(parser.urlencoded({ extended: false }))
// application/json
app.use(parser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

const swaggerDocument = YAML.load('./swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

require('./src/routes/api')(app)

// Error Handler Middleware
app.use(errorMiddleware)

module.exports = app
