/**
 * @description 博客 @ 关系 controller
 * @author ameng
 */

const { getAtRelationCount } = require('../services/at-relation');
const { SuccessModel, ErrorModel } = require('../model/ResModel');

/**
 * 获取 @ 我的博客数量
 * @param {number} userId userId
 */
async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId);
  return new SuccessModel({
    count
  });
}

module.exports = {
  getAtMeCount
};
