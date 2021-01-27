/**
 * @description 用户数据模型
 * @author ameng
 */

const sequelize = require('../seq');
const { DataTypes } = require('sequelize');

//users
const User = sequelize.define('user', {
  // id 自动创建 并设为主键、自增

  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名, 唯一'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nickName: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '昵称'
  },
  gender: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '性别 (1 男性，2 女性，3 保密)'
  },
  picture: {
    type: DataTypes.STRING,
    comment: '头像，图片地址'
  },
  city: {
    type: DataTypes.STRING,
    comment: '城市'
  }
});

module.exports = User;
