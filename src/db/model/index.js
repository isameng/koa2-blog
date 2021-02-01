/**
 * @description 数据模型入口文件
 * @author ameng
 */

const User = require('./User');
const Blog = require('./Blog');
const UserRelation = require('./UserRelation');

// A.hasOne(B); // A 有一个 B    A 和 B 之间存在一对一的关系,外键在目标模型(B)中定义.
// A.belongsTo(B); // A 属于 B   A 和 B 之间存在一对一的关系,外键在源模型中定义(A)
// A.hasMany(B); // A 有多个 B   A 和 B 之间存在一对多关系,外键在目标模型(B)中定义.
// A.belongsToMany(B, { through: 'C' }); // A 属于多个 B , 通过联结表 C

// 创建一个 一对一 关系, hasOne 和 belongsTo 关联一起使用;
// 创建一个 一对多 关系, hasMany he belongsTo 关联一起使用;
// 创建一个 多对多 关系, 两个 belongsToMany 调用一起使用.

// 查询 blog 带出用户信息
Blog.belongsTo(User, {
  //创建外键 Blog.userId -> User.id
  foreignKey: 'userId'
});

// User.hasMany(Blog, {
//   //创建外键 Blog.userId -> User.id
//   foreignKey: 'userId'
// });

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
});

User.hasMany(UserRelation, {
  foreignKey: 'userId'
});

module.exports = {
  User,
  Blog,
  UserRelation
};
