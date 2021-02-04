/**
 * @description 博客 @ 关系 test
 * @author ameng
 */

const server = require('../server');
const { Z_COOKIE, L_COOKIE, L_USER_NAME } = require('../testUserInfo');

// 存储博客 id
let BLOG_ID = '';

test('张三创建一条博客，@李四，应该能成功', async () => {
  const content = '单元测试自动创建的博客 @李四 - ' + L_USER_NAME;
  const res = await server
    .post('/api/blog/create')
    .send({
      content
    })
    .set('cookie', Z_COOKIE);
  expect(res.body.errno).toBe(0);

  // 记录博客 id
  BLOG_ID = res.body.data.id;
});

test('获取李四的 @ 列表，应该有刚刚创建的博客', async () => {
    const res = await server.get('/api/atMe/loadMore/0').set('cookie', L_COOKIE);
    expect(res.body.errno).toBe(0);
    const data = res.body.data;
    const blogList = data.blogList;
    const isHaveCurBlog = blogList.some(blog => blog.id === BLOG_ID);
    expect(isHaveCurBlog).toBe(true);
});
