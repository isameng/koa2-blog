/**
 * @description 首页 controller
 * @author ameng
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlog, getFollowersBlogList } = require('../services/blog');
const { createBlogFailInfo } = require('../model/ErrorInfo');
const xss = require('xss');
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../config/constant');
const { getUserInfo } = require('../services/user');
const { createAtRelation } = require('../services/at-relation');

/**
 * 创建博客
 * @param {number} userId  用户ID
 * @param {string} content 内容
 * @param {string} image 图片地址
 */
async function create({ userId, content, image }) {
  //分析并收集 content 中的 @ 用户
  // content 格式 如：'哈啰 @李四 - lisi 你好 @王五 - wangwu';
  const atUserNameList = [];
  content = content.replace(REG_FOR_AT_WHO, (matchStr, nickName, userName) => {
    //获取 内容中的 userName
    atUserNameList.push(userName);
    //返回原内容
    return matchStr;
  });
  // 根据 @ 用户名查询用户信息
  const atUserList = await Promise.all(atUserNameList.map(userName => getUserInfo(userName)));

  const atUserIdList = atUserList.map(user => user.id);

  try {
    const blog = await createBlog({ userId, content: xss(content), image });

    //创建 @ 关系
    await Promise.all(atUserIdList.map(userId => createAtRelation(blog.id, userId)));

    return new SuccessModel(blog);
  } catch (ex) {
    console.error(ex.message, ex.stack); //stack 错误堆栈信息
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
