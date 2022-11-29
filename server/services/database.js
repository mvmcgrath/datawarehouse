const mysql = require('mysql2/promise')
const config = require('../utils/config')

const query = async (sqlStatement) => {
  const connection = await mysql.createConnection(config.DB_CONFIG)

  const data = await connection.execute(sqlStatement)

  return data[0]
}

module.exports = { query }