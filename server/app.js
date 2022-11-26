const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const warehouseRouter = require('./controllers/warehouse')

app.use(cors())
app.use(express.json())

app.use('/api/warehouse', warehouseRouter)

module.exports = app