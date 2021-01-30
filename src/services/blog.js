/**
 * @description blog service
 * @author ameng
 */

const { Blog } = require('../db/model/index');

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

module.exports = {
  createBlog
};
