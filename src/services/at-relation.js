/**
 * @description 博客 @ 用户关系 service
 * @author ameng
 */

const { AtRelation } = require('../db/model/index');

/**
 * 创建博客 @ 用户的关系
 * @param {number} blogId 博客 id
 * @param {number} userId 用户 id
 */
async function createAtRelation(blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId
  });
  return result.dataValues;
}

module.exports = {
  createAtRelation
};
