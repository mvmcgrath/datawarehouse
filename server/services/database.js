const mysql = require('mysql2/promise')
//const config = require('../utils/config')

const query = async (sqlStatement) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'graduatewarehouse',
    port: '3306'
  })

  const data = await connection.execute(sqlStatement)

  return data[0]
}

module.exports = { query }