/**
 * @description blog 数据格式校验
 * @author ameng
 */

const validate = require('./_validate');

// 校验规则 Json Schema
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
};

/**
 * 校验博客数据格式
 * @param {Object} data 博客数据
 */
function blogValidate(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = blogValidate;
