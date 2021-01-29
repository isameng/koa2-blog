/**
 * @description 博客 view 路由
 * @author ameng
 */

const router = require('koa-router')();
const { loginRedirect } = require('../../middleware/loginChecks');

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {});
});

module.exports = router;
