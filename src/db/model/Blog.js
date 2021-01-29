/**
 * @description 微博数据模型
 * @author ameng
 */

const sequelize = require('../seq');
const { DataTypes } = require('sequelize');

const Blog = sequelize.define('blog', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户 ID'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: DataTypes.STRING,
    comment: '图片地址'
  }
});

module.exports = Blog;
