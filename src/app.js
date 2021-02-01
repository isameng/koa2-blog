const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const koaStatic = require('koa-static');
const path = require('path');

const { REDIS_CONF } = require('./config/db');
const { isProd } = require('./utils/env');
const { SESSION_SECRET_KEY } = require('./config/secretKeys');

//路由
const utilsAPIRouter = require('./routes/api/utils');
const squareAPIRouter = require('./routes/api/blog-square');
const profileAPIRouter = require('./routes/api/blog-profile');
const homeAPIRouter = require('./routes/api/blog-home');
const userAPIRouter = require('./routes/api/user');
const blogViewRouter = require('./routes/view/blog');
const userViewRouter = require('./routes/view/user');
const errorViewRouter = require('./routes/view/error');

// koa-onerror 会自动地把err.status当作response的status code, 而且自动地把err.headers当作response的headers。
let onerrorConf = {};
if (isProd) {
  // 线上环境 遇到错误的时候 跳转到 error路径
  onerrorConf = {
    redirect: '/error'
  };
}
onerror(app, onerrorConf);

// middlewares
// POST请求 bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
// koa-json美观的输出response JSON
app.use(json());
// 在命令行打印log
app.use(logger());
// 注册静态资源
app.use(koaStatic(__dirname + '/public'));
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')));

// 加载模板引擎
app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
);

//session 配置
app.keys = [SESSION_SECRET_KEY]; //加密cookie的随机字符串
app.use(
  session({
    key: 'blog.sid', // cookie name 默认是 'koa.sid'
    prefix: 'blog:sess:', //redis key 的前缀，默认是 'koa:sess:'
    cookie: {
      path: '/', //cookie在所有目录可以访问
      httpOnly: true, //只允许server端修改cookie
      maxAge: 24 * 60 * 60 * 1000 //ms 过期时间
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  })
);

// 手动输出log
// app.use(async (ctx, next) => {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

// routes  allowedMethods: status为空或者404时，koa会自动设置header一些信息，并且直接返回失败
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods());
app.use(userViewRouter.routes(), userViewRouter.allowedMethods());
app.use(squareAPIRouter.routes(), squareAPIRouter.allowedMethods());
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods());
app.use(homeAPIRouter.routes(), homeAPIRouter.allowedMethods());
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods());
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods());
// 404路由注册到最后面
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods());

// error 事件侦听器
app.on('error', (err, ctx) => {
  /* 错误的集中处理:
   *  log 出来
   *  写入日志
   *  写入数据库
   *   ...
   */
  console.error('server error', err, ctx);
});

module.exports = app;
