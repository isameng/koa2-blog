/**
 * @description sequelize 实例
 * @author ameng
 */

const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../config/db');
const { isProd, isTest } = require('../utils/env');

const { host, user, password, database } = MYSQL_CONF;
const config = {
  host,
  dialect: 'mysql'
};

// 在单元测试中尽量少打印一些与测试无关的日志，避免和测试的日志混淆，这里把sequelize的logging改成空函数 也就是在测试的时候关掉
if (isTest) {
  config.logging = () => {};
}

//线上环境 使用连接池
if (isProd) {
  config.pool = {
    max: 5, //连接池中最大的连接数量5
    min: 0, //最小
    idle: 10000 //如果一个连接池 10s 之内没有被使用，则释放
  };
}

const sequelize = new Sequelize(database, user, password, config);

module.exports = sequelize;
