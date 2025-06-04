const { Sequelize } = require('sequelize')
require('dotenv').config()  // .env에서 환경변수 로드

console.log('DB_NAME=', process.env.DB_NAME, 'DB_USER=', process.env.DB_USER)

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER,  
  process.env.DB_PASS,  
  {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
)

//  연결 테스트 로그
sequelize
  .authenticate()
  .then(() => console.log('✅ models/index.js: DB 연결 성공'))
  .catch(err => console.error('❌ models/index.js: DB 연결 실패', err))

module.exports = sequelize
