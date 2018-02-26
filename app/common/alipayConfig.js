module.exports = {

  /* 更多参数请翻源码 */

  /* 应用AppID */
  appid: '你的APPID',

  /* 通知URL */
  notifyUrl: '你的回调通知地址',

  /* 应用RSA私钥 请勿忘记 -----BEGIN RSA PRIVATE KEY----- 与 -----END RSA PRIVATE KEY-----  */
  merchantPrivateKey: '-----BEGIN RSA PRIVATE KEY-----\n你的私钥\n-----END RSA PRIVATE KEY-----',

  /* 支付宝公钥 如果为空会使用默认值 请勿忘记 -----BEGIN PUBLIC KEY----- 与 -----END PUBLIC KEY----- */
  alipayPublicKey: '-----BEGIN PUBLIC KEY-----\n你的公钥\n-----END PUBLIC KEY-----',

  /* 支付宝支付网关 如果为空会使用沙盒网关 */
  gatewayUrl: 'https://openapi.alipaydev.com/gateway.do',
};
