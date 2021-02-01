/**
 * @description 用户关系 service
 * @author ameng
 */

const { User, UserRelation } = require('../db/model/index');
const { formatUser } = require('./_format');

/**
 * 获取关注该用户的用户列表，即该用户的粉丝
 * @param {number} followerId 被关注人的 id
 */
async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [['id', 'desc']],
    include: [
      {
        model: UserRelation,
        where: {
          followerId
        }
      }
    ]
  });
  const userList = result.rows.map(row => {
    let user = row.dataValues;
    user = formatUser(user);
    console.log(user);
    return user;
  });

  return { count: result.count, userList };
}

module.exports = {
  getUsersByFollower
};
