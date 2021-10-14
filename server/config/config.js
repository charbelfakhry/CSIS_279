var config = {
  PORT : 3306,
  HOST : 'localhost',
  USER : 'root',
  PASSWORD : 'root',
  DB : 'csis_279_db',
  multipleStatements: true ,
}

module.exports = {
  config: config,
  JWT_SECRET: 'SPSJwtSec',
} ;