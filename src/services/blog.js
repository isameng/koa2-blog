/**
 * @description blog service
 * @author ameng
 */

const { Blog, User, UserRelation } = require('../db/model/index');
const { formatUser, formatBlog } = require('./_format');

/**
 * 创建博客
 * @param {number} userId  用户ID
 * @param {string} content 内容
 * @param {string} image 图片地址
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  });
  return result.dataValues;
}

/**
 * 根据用户获取博客列表
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页
 * @param {number} pageSize 每页的数量
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
  const userWhereOpts = {};
  if (userName) {
    userWhereOpts.userName = userName;
  }

  const result = await Blog.findAndCountAll({
    limit: pageSize, //每页多少条
    offset: pageSize * pageIndex, //跳过多少条
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ]
  });
  const blogList = result.rows.map(row => {
    let blog = row.dataValues;
    blog = formatBlog(blog);
    const user = blog.user.dataValues;
    blog.user = formatUser(user);
    return blog;
  });

  // let blogList = result.rows.map(row => row.dataValues);
  // blogList = formatBlog(blogList);
  // blogList = blogList.map(item => {
  //   const user = item.user.dataValues;
  //   item.user = formatUser(user);
  //   return item;
  // });

  return { count: result.count, blogList };
}

/**
 * 获取关注者的博客列表（首页）
 * @param {number} userId userId
 * @param {number} pageIndex 当前页
 * @param {number} pageSize 每页的数量
 */
async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize, //每页多少条
    offset: pageSize * pageIndex, //跳过多少条
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: { userId }
      }
    ]
  });

  const blogList = result.rows.map(row => {
    let blog = row.dataValues;
    blog = formatBlog(blog);
    const user = blog.user.dataValues;
    blog.user = formatUser(user);
    return blog;
  });

  return { count: result.count, blogList };
}

module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowersBlogList
};
