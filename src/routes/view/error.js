/**
 * @description error 404 路由
 * @author ameng
 */
const router = require('koa-router')();

router.get('/get-an-error', async (ctx, next) => {
  // throw Error();
  ctx.body = {
    msg: 'xxx'
  };
});

router.get('/error', async (ctx, next) => {
  await ctx.render('error');
});

//404
router.get('*', async (ctx, next) => {
  await ctx.render('404');
});

module.exports = router;
