require('dotenv').config()

const PORT = process.env.PORT || 3003
const DB_CONFIG = {
  host: process.env.MYSQL_URI,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: 'graduatewarehouse',
  port: process.env.DB_PORT
}

module.exports = {
  PORT,
  DB_CONFIG
}