require('dotenv').config()

const PORT = process.env.PORT || 3003
const DB_CONFIG = {
  host: process.env.MYSQL_URI,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: 'graduatewarehouse',
  port: 3306
}

module.exports = {
  PORT,
  DB_CONFIG
}