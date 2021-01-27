/**
 * @description user API 路由
 * @author ameng
 */

const router = require('koa-router')();
const { isExist } = require('../../controller/user');

router.prefix('/api/user');

//注册
router.post('/register', async (ctx, next) => {
  // console.log(ctx.request.body);
});

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  // controller
  ctx.body = await isExist(userName);
});

module.exports = router;
