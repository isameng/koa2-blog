/**
 * @description 首页 test
 * @author ameng
 */

const server = require('../server');
const { Z_COOKIE } = require('../testUserInfo');

// 存储博客 id
let BLOG_ID = '';

test('创建一条博客，应该成功', async () => {
  const content = '单元测试自动创建的博客_' + Date.now();
  const image = '/xxx.png';

  const res = await server
    .post('/api/blog/create')
    .send({
      content,
      image
    })
    .set('cookie', Z_COOKIE);
  expect(res.body.errno).toBe(0);
  expect(res.body.data.content).toBe(content);
  expect(res.body.data.image).toBe(image);

  // 记录博客 id
  BLOG_ID = res.body.data.id;
});

test('首页加载第一页数据，应该成功', async () => {
  const res = await server.get('/api/blog/loadMore/0').set('cookie', Z_COOKIE);
  expect(res.body.errno).toBe(0);

  const data = res.body.data;
  //toHaveProperty 断言对象里面是否有这个属性
  expect(data).toHaveProperty('isEmpty');
  expect(data).toHaveProperty('blogList');
  expect(data).toHaveProperty('pageSize');
  expect(data).toHaveProperty('pageIndex');
  expect(data).toHaveProperty('count');
});
