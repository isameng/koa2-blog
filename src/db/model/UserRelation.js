/**
 * @description 用户关注关系数据模型
 * @author ameng
 */
const sequelize = require('../seq');
const { DataTypes } = require('sequelize');

const UserRelation = sequelize.define('userRelation', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '被关注用户的 id'
  }
});

module.exports = UserRelation;
