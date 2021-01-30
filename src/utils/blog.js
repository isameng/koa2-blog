/**
 * @description 博客数据相关的工具方式
 * @author ameng
 */
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

//获取 blog-list.ejs 的文件内容
const BLOG_LIST_TPL = fs.readFileSync(path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')).toString();

/**
 * 根据 blogList 渲染出 html 字符串
 * @param {Array} blogList 博客列表
 * @param {boolean} canReply 是否可以回复
 */
function getBlogListStr(blogList = [], canReply = false) {
  console.log('BLOG_LIST_TPL == ', BLOG_LIST_TPL);
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply
  });

}

module.exports = {
  getBlogListStr
};
