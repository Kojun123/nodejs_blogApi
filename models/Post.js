const { DataTypes } = require('sequelize')
const sequelize = require('./index')  // models/index.js에서 내보낸 인스턴스 가져오기

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
})

module.exports = Post
