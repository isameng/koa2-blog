/**
 * @description json schema 校验
 * @author ameng
 */

const Ajv = require('ajv');
const ajv = new Ajv({
  //   allErrors: true //输出所有的错误（比较慢）
});

/**
 * json schema 校验
 * @param {Object} schema json schema 规则
 * @param {Object} data 待校验的数据
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    return ajv.errors[0]; //因为默认输出一个错误，所以这里拿第一个就行了
  }
}

module.exports = validate;
