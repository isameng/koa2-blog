/**
 * @description 登录验证的中间件
 * @author ameng
 */

const { ErrorModel } = require('../model/ResModel');
const { loginCheckFailInfo } = require('../model/ErrorInfo');

/**
 * API登录验证
 * @param {Object} ctx ctx
 * @param {function} next next
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    //已登录
    await next();
    return;
  }
  //未登录
  ctx.body = new ErrorModel(loginCheckFailInfo);
}

/**
 * 页面登录验证
 * @param {Object} ctx ctx
 * @param {function} next next
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    //已登录
    await next();
    return;
  }
  //未登录
  // const curUrl = ctx.url;
  let curUrl = '/login';
  if(ctx.url !== '/') {
    curUrl = curUrl + '?url=' + encodeURIComponent(ctx.url);
  }
  ctx.redirect(curUrl);
}

module.exports = {
  loginCheck,
  loginRedirect
};
