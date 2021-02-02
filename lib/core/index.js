'use strict'

import Promise from 'bluebird'
import Auth from '../auth'
import Wxacode from '../wxacode'
import Base from '../base'
import Live from '../live'

const pg = require('../../package.json')
const request = Promise.promisify(require('request'))


// TODO 接口调用频次
export default class Core {
  constructor (opt) {
    this.config = Object.assign({
      // 小程序appid
      appid: '',
      // 小程序secret
      secret: '',
      // 商户id(如需支付，请设置)
      mch_id: '',
      // 小程序API网关地址
      domain: '',
      // 小程序支付网关地址
      paydomain: '',
      // 支付的商户key
      paykey: '',
      // 支付商户证书.p12的路径(若要调用退款,请设置此路径)
      refundCAPath: ''
    }, opt)
    // 设置token方法接收Promise
    this.setToken = opt.setToken || null
    // token值
    this.accessToken = ''
    // token刷新间隔
    this.accessTokenTiming = 110 * 60 * 60 * 1000
    // token最后刷新时间
    this.tokenUpdateAt = new Date().getTime()
    // 会话存储key: openid
    this.sessionKeyMap = {}
    this.uri = opt.uri || 'https://api.weixin.qq.com'
    this.version = pg.version
  }
  async getToken () {
    if (this.setToken) {
      this.accessToken = await this.setToken
    } else if (!this.accessToken || this.tokenUpdateAt + this.accessTokenTiming < new Date().getTime()) {
      const res = await this.auth.getAccessToken()
      // console.log('getToken', res)
      this.accessToken = res.access_token
    }
    return this.accessToken
  }
  async ajaxAsync (req) {
    const res = await request(req)
    // console.log('ajaxAsync', req)
    return JSON.parse(res.body)
  }
  init () {
    this.auth = new Auth(this)
    this.wxacode = new Wxacode(this)
    this.base = new Base(this)
    this.live = new Live(this)
    return this
  }
}
