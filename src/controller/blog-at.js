/**
 * @description 博客 @ 关系 controller
 * @author ameng
 */

const { getAtRelationCount, getAtUserBlogList, updateAtRelation } = require('../services/at-relation');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { PAGE_SIZE } = require('../config/constant');

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

/**
 * 获取 @ 用户的博客列表
 * @param {number} userId userId
 * @param {number} pageIndex pageIndex
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  const { count, blogList } = await getAtUserBlogList({ userId, pageIndex, pageSize: PAGE_SIZE });

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  });
}

/**
 * 标记为已读
 * @param {number} userId userId
 */
async function markAsRead(userId) {
  try {
    await updateAtRelation({ newIsRead: true }, { userId, isRead: false });
  } catch (ex) {
    console.log(ex);
  }
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead
};
