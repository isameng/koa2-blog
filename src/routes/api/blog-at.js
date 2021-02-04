/**
 * @description 博客 @ 关系 API 路由
 * @author ameng
 */

const router = require('koa-router')();
const { loginCheck } = require('../../middleware/loginChecks');
const { getAtMeBlogList } = require('../../controller/blog-at');
const { getBlogListStr } = require('../../utils/blog');

router.prefix('/api/atMe');

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const { id: userId } = ctx.session.userInfo;
  const result = await getAtMeBlogList(userId, pageIndex);
  //渲染为 html 字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList);
  ctx.body = result;
});

module.exports = router;
