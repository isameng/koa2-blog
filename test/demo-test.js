/**
 * @description json test
 * @author ameng
 */

const server = require('./server');

test('json 接口返回数据格式正确', async () => {
  const res = await server.get('/json');
  //断言 toEqual 是比较对象的， toBe/not.toBe 是比较值
  //expect(res.body.title).toBe('koa2 json');
  expect(res.body).toEqual({
    title: 'koa2 json'
  });
});
