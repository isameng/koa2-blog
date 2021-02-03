/**
 * @description 首页 API 路由
 * @author ameng
 */

const router = require('koa-router')();
const { loginCheck } = require('../../middleware/loginChecks');
const { create, getHomeBlogList } = require('../../controller/blog-home');
const blogValidate = require('../../validator/blog');
const { genValidator } = require('../../middleware/validator');
const { getBlogListStr } = require('../../utils/blog');

router.prefix('/api/blog');

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body;
  const { id: userId } = ctx.session.userInfo;
  ctx.body = await create({ userId, content, image });
});

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const { id: userId } = ctx.session.userInfo;
  const result = await getHomeBlogList(userId, pageIndex);
  //渲染为 html 字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList);
  ctx.body = result;
});

module.exports = router;
