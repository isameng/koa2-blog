/**
 * @description blog model test
 * @author ameng
 */

const { Blog } = require('../../src/db/model/index');

test('blog 模型的各个属性，符合预期', () => {
  const blog = Blog.build({
    userId: 1,
    content: '博客内容',
    image: '/test.png'
  });
  expect(blog.userId).toBe(1);
  expect(blog.content).toBe('博客内容');
  expect(blog.image).toBe('/test.png');
});
