/**
 * @description 首页 API 路由
 * @author ameng
 */

const router = require('koa-router')();
const { loginCheck } = require('../../middleware/loginChecks');
const { create } = require('../../controller/blog-home');

router.prefix('/api/blog');

router.post('/create', loginCheck, async (ctx, next) => {
  const { content, image } = ctx.request.body;
  const { id: userId } = ctx.session.userInfo;
  ctx.body = await create({ userId, content, image });
});

module.exports = router;
