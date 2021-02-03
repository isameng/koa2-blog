/**
 * @description 首页 controller
 * @author ameng
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlog, getFollowersBlogList } = require('../services/blog');
const { createBlogFailInfo } = require('../model/ErrorInfo');
const xss = require('xss');
const { PAGE_SIZE } = require('../config/constant');

/**
 * 创建博客
 * @param {number} userId  用户ID
 * @param {string} content 内容
 * @param {string} image 图片地址
 */
async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({ userId, content: xss(content), image });
    return new SuccessModel(blog);
  } catch (ex) {
    console.log(ex.message, ex.stack); //stack 错误堆栈信息
    return new ErrorModel(createBlogFailInfo);
  }
}

/**
 * 获取首页博客列表
 * @param {number} userId userId
 * @param {number} pageIndex pageIndex
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const { count, blogList } = await getFollowersBlogList({ userId, pageIndex, pageSize: PAGE_SIZE });

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  });
}

module.exports = {
  create,
  getHomeBlogList
};
