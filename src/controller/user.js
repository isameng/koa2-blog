/**
 * @description user controller
 * @author ameng
 */

const { getUserInfo, createUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo
} = require('../model/ErrorInfo');
const doCrypto = require('../utils/crypt');

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName);
  //统一返回格式
  if (userInfo) {
    return new SuccessModel(userInfo);
  } else {
    return new ErrorModel(registerUserNameNotExistInfo);
  }
}

/**
 *
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 (1 男，2 女，3 保密)
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName);
  // 业务逻辑处理
  if (userInfo) {
    //用户名已存在
    return new ErrorModel(registerUserNameExistInfo);
  }

  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    });
    return new SuccessModel();
  } catch (ex) {
    console.log(ex.message, ex.stack); //stack 错误堆栈信息
    return new ErrorModel(registerFailInfo);
  }
}

/**
 * 登录
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
  // 登录成功 ctx.session.userInfo = xxx
  const userInfo = await getUserInfo(userName, doCrypto(password));
  if (!userInfo) {
    //登录失败
    return new ErrorModel(loginFailInfo);
  }

  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo;
  }
  return new SuccessModel();
}

module.exports = {
  isExist,
  register,
  login
};