/**
 * @description sequelize 同步数据库
 * @author ameng
 */

const sequelize = require('./seq');
require('./model/index');

sequelize
  .authenticate()
  .then(() => {
    console.log('auth ok');
  })
  .catch(() => {
    console.log('auth err');
  });

//force: true 将创建表,如果表已经存在,则将其首先删除
sequelize.sync({ force: true }).then(() => {
  console.log('sync ok');
  process.exit();
});
