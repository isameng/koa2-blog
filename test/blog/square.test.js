/**
 * @description 广场页 测试
 * @author ameng
 */

const server = require('../server');
const { COOKIE } = require('../testUserInfo');

test('广场加载第一页数据，应该成功', async () => {
  const res = await server.get('/api/square/loadMore/0').set('cookie', COOKIE);
  expect(res.body.errno).toBe(0);

  const data = res.body.data;
  //toHaveProperty 断言对象里面是否有这个属性
  expect(data).toHaveProperty('isEmpty');
  expect(data).toHaveProperty('blogList');
  expect(data).toHaveProperty('pageSize');
  expect(data).toHaveProperty('pageIndex');
  expect(data).toHaveProperty('count');
});
