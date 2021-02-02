export default class Auth {
  constructor (core) {
    this.core = core
  }
  // 登录凭证校验
  code2Session (opt = {}) {
    const query = {
      appid: this.core.config.appid,
      secret: this.core.config.secret,
      // 登录时获取的 code
      js_code: opt.js_code,
      // 授权类型，此处只需填写 authorization_code
      grant_type: 'authorization_code'
    }
    const url = '/sns/jscode2session'
    // TODO sesstionkey
    return this.core.ajaxAsync({
      url: this.core.uri + url,
      method: 'GET',
      qs: query
    })
  }
  // 用户支付完成后，获取该用户的 UnionId，无需用户授权
  async getPaidUnionId (opt) {
    await this.core.getToken()
    const query = {
      // 是：接口调用凭证
      access_token: this.core.accessToken,
      // 是：支付用户唯一标识
      openid: opt.openid,
      // 否：微信支付订单号
      transaction_id: opt.transaction_id,
      // 否：微信支付分配的商户号，和商户订单号配合使用
      mch_id: opt.mch_id,
      // 否：微信支付商户订单号，和商户号配合使用
      out_trade_no: opt.out_trade_no
    }
    const url = '/wxa/getpaidunionid'
    return this.core.ajaxAsync({
      url: this.core.uri + url,
      method: 'GET',
      qs: query
    })
  }
  // 获取小程序全局唯一后台接口调用凭据（access_token）
  getAccessToken () {
    const query = {
      appid: this.core.config.appid,
      secret: this.core.config.secret,
      // 授权类型，此处只需填写 client_credential
      grant_type: 'client_credential'
    }
    const url = '/cgi-bin/token'
    return this.core.ajaxAsync({
      url: this.core.uri + url,
      method: 'GET',
      qs: query
    })
  }
}
