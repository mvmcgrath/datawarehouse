const warehouseRouter = require('express').Router()
const databaseService = require('../services/database')

warehouseRouter.post('/', async (request, response) => {
  const { sqlStatement } = request.body
  const data = await databaseService.query(sqlStatement)
  response.json(data)
})


module.exports = warehouseRouter