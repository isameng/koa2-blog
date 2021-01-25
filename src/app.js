const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const index = require('./routes/index');
const users = require('./routes/users');

// koa-onerror 会自动地把err.status当作response的status code, 而且自动地把err.headers当作response的headers。
onerror(app);

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
app.use(require('koa-static')(__dirname + '/public'));

// 加载模板引擎
app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
);

// 手动输出log
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes  allowedMethods: status为空或者404时，koa会自动设置header一些信息，并且直接返回失败
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

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
