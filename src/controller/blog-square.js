/**
 * @description 广场 controller
 * @author ameng
 */

const { getBlogListByUser } = require('../services/blog');
const { PAGE_SIZE } = require('../config/constant');
const { SuccessModel } = require('../model/ResModel');
const { getSquareCacheList } = require('../cache/blog');

/**
 * 获取广场的博客列表
 * @param {number} pageIndex 当前页面
 */
async function getSquareBlogList(pageIndex = 0) {
  //cache
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE);
  const blogList = result.blogList;

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  });
}

module.exports = {
  getSquareBlogList
};
