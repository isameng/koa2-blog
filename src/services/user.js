/**
 * @description user service
 * @author ameng
 */

// services 的功能只对数据进行维护和管理, 不涉及到业务 业务都在controller
const { User } = require('../db/model/index');
const { formatUser } = require('./_format');

/**
 * 获取用户信息
 * @param {string} userName  用户名
 * @param {string} password  密码
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  };
  if (password) {
    Object.assign(whereOpt, { password });
  }

  //查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  });
  if (result == null) {
    //未找到
    return result;
  }
  //格式化
  const formatRes = formatUser(result.dataValues);
  return formatRes;
}

/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} nickName 昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName,
    gender
  });
  return result.dataValues;
}

/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
  const delUserRes = await User.destroy({
    where: {
      userName
    }
  });
  // delUserRes 删除的行数
  return delUserRes > 0;
}

/**
 * 更新用户信息
 * @param {Object} param0 要修改的内容 {newPassword, newNickName, newPicture, newCity}
 * @param {Object} param1 查询条件 {userName, password}
 */
async function updateUser({ newPassword, newNickName, newPicture, newCity }, { userName, password }) {
  const updateData = {};
  if (newPassword) {
    updateData.password = newPassword;
  }
  if (newNickName) {
    updateData.nickName = newNickName;
  }
  if (newPicture) {
    updateData.picture = newPicture;
  }
  if (newCity) {
    updateData.city = newCity;
  }

  const whereData = {
    userName
  };
  if (password) {
    whereData.password = password;
  }

  const result = await User.update(updateData, {
    where: whereData
  });
  //修改的行数
  return result[0] > 0;
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
};
