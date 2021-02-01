/**
 * @description 广场 API 路由
 * @author ameng
 */

const router = require('koa-router')();
const { loginCheck } = require('../../middleware/loginChecks');
const { getSquareBlogList } = require('../../controller/blog-square');
const { getBlogListStr } = require('../../utils/blog');

router.prefix('/api/square');

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const result = await getSquareBlogList(pageIndex);
  //渲染为 html 字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList);
  ctx.body = result;
});

module.exports = router;
