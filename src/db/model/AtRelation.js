/**
 * @description 博客 @ 用户的关系 数据模型
 * @author ameng
 */

const sequelize = require('../seq');
const { DataTypes } = require('sequelize');

const AtRelation = sequelize.define('atRelation', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '博客 id'
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, //默认未读
    comment: '是否已读'
  }
});

module.exports = AtRelation;
