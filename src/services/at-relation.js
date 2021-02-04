/**
 * @description 博客 @ 用户关系 service
 * @author ameng
 */

const { AtRelation, Blog, User } = require('../db/model/index');
const { formatUser, formatBlog } = require('./_format');

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

/**
 * 获取 @ 用户的博客数量（未读的）
 * @param {number} userId userId
 */
async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  });
  return result.count;
}

/**
 * 获取 @ 用户的微博列表
 * @param {*} userId userId
 * @param {*} pageIndex pageIndex
 * @param {*} pageSize pageSize
 */
async function getAtUserBlogList({ userId, pageIndex, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [['id', 'desc']],
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: {
          userId
        }
      },
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  });

  const blogList = result.rows.map(row => {
    const blog = formatBlog(row.dataValues);
    blog.user = formatUser(blog.user.dataValues);
    return blog;
  });

  return { count: result.count, blogList };
}

/**
 * 更新 AtRelation
 * @param {Object} param0 更新内容
 * @param {Object} param1 查询条件
 */
async function updateAtRelation({ newIsRead }, { userId, isRead }) {
  const updateData = {};
  if (newIsRead) {
    updateData.isRead = newIsRead;
  }
  const whereData = {};
  if (userId) {
    whereData.userId = userId;
  }
  if (isRead) {
    whereData.isRead = isRead;
  }
  const result = await AtRelation.update(updateData, {
    where: whereData
  });

  return result[0] > 0;
}

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation
};
