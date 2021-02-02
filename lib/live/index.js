export default class Live {
  constructor (core) {
    this.core = core
  }
  // 创建直播房间
  async createRoom (opt = {}) {
    await this.core.getToken()
    const query = {
      // 是：接口调用凭证
      access_token: this.core.accessToken
    }
    const params = {
      // 是：直播间名字，最短3个汉字，最长17个汉字，1个汉字相当于2个字符
      name: opt.name,
      // 是：背景图，填入mediaID（mediaID获取后，三天内有效）；图片mediaID的获取，请参考以下文档： https://developers.weixin.qq.com/doc/offiaccount/Asset_Management/New_temporary_materials.html；直播间背景图，图片规则：建议像素1080*1920，大小不超过2M
      coverImg: opt.coverImg,
      // 是：直播计划开始时间（开播时间需要在当前时间的10分钟后 并且 开始时间不能在 6 个月后）
      startTime: opt.startTime,
      // 是：直播计划结束时间（开播时间和结束时间间隔不得短于30分钟，不得超过24小时）
      endTime: opt.endTime,
      // 是：主播昵称，最短2个汉字，最长15个汉字，1个汉字相当于2个字符
      anchorName: opt.anchorName,
      // 是：主播微信号，如果未实名认证，需要先前往“小程序直播”小程序进行实名验证
      anchorWechat: opt.anchorWechat,
      // 是：直播计划结束时间（开播时间和结束时间间隔不得短于30分钟，不得超过24小时）
      shareImg: opt.shareImg,
      // 是：直播间类型 【1: 推流，0：手机直播】
      type: opt.type || 0,
      // 是：横屏、竖屏 【1：横屏，0：竖屏】（横屏：视频宽高比为16:9、4:3、1.85:1 ；竖屏：视频宽高比为9:16、2:3）
      screenType: opt.screenType || 0,
      // 是：是否关闭点赞 【0：开启，1：关闭】（若关闭，直播开始后不允许开启）
      closeLike: opt.closeLike || 1,
      // 是：是否关闭货架 【0：开启，1：关闭】（若关闭，直播开始后不允许开启）
      closeGoods: opt.closeGoods || 1,
      // 是：是否关闭评论 【0：开启，1：关闭】（若关闭，直播开始后不允许开启）
      closeComment: opt.closeComment || 1
    }
    const url = '/wxaapi/broadcast/room/create'
    return this.core.ajaxAsync({
      url: this.core.uri + url,
      method: 'POST',
      qs: query,
      form: params
    })
  }
  // 获取直播房间列表
  async getLiveinfo (opt) {
    await this.core.getToken()
    const query = {
      // 是：接口调用凭证
      access_token: this.core.accessToken
    }
    const url = '/wxa/business/getliveinfo'
    const params = {
      // 是：起始房间，0表示从第1个房间开始拉取
      start: opt.start || 0,
      // 是：每次拉取的房间数量，建议100以内
      limit: opt.limit
    }
    return this.core.ajaxAsync({
      url: this.core.uri + url,
      method: 'POST',
      qs: query,
      form: params
    })
  }
  // 获取直播回放
  async getReplay (opt) {
    await this.core.getToken()
    const query = {
      // 是：接口调用凭证
      access_token: this.core.accessToken
    }
    const url = '/wxa/business/getliveinfo'
    const params = {
      // 是：获取回放
      action: 'get_replay',
      // 是：直播间ID
      room_id: opt.room_id,
      // 是：起始拉取视频，0表示从第一个视频片段开始拉取
      start: opt.start,
      // 是：每次拉取的数量，建议100以内
      limit: opt.limit
    }
    return this.core.ajaxAsync({
      url: this.core.uri + url,
      method: 'POST',
      qs: query,
      form: params
    })
  }
  // 往指定直播间导入已入库的商品
  async addGoods (opt) {
    await this.core.getToken()
    const query = {
      // 是：接口调用凭证
      access_token: this.core.accessToken
    }
    const url = '/wxaapi/broadcast/room/addgoods'
    const params = {
      // 是：获取回放
      ids: opt.ids,
      // 是：房间ID
      roomId: opt.roomId
    }
    return this.core.ajaxAsync({
      url: this.core.uri + url,
      method: 'POST',
      qs: query,
      form: params
    })
  }
  // 商品添加并且审核
  async createGoods (opt) {
    await this.core.getToken()
    const query = {
      // 是：接口调用凭证
      access_token: this.core.accessToken
    }
    const url = '/wxaapi/broadcast/goods/add'
    const params = {
      goodsInfo: {
        // 是：填入mediaID（mediaID获取后，三天内有效）；图片mediaID的获取，请参考以下文档： https://developers.weixin.qq.com/doc/offiaccount/Asset_Management/New_temporary_materials.html；图片规则：图片尺寸最大300像素*300像素；
        coverImgUrl: opt.coverImgUrl,
        // 是：商品名称，最长14个汉字，1个汉字相当于2个字符
        name: opt.name,
        // 是：价格类型，1：一口价（只需要传入price，price2不传） 2：价格区间（price字段为左边界，price2字段为右边界，price和price2必传） 3：显示折扣价（price字段为原价，price2字段为现价， price和price2必传）
        priceType: opt.priceType,
        // 是：数字，最多保留两位小数，单位元
        price: opt.price,
        // 是：数字，最多保留两位小数，单位元
        price2: opt.price2,
        // 是：商品详情页的小程序路径，路径参数存在 url 的，该参数的值需要进行 encode 处理再填入
        url: opt.url
      }
    }
    return this.core.ajaxAsync({
      url: this.core.uri + url,
      method: 'POST',
      qs: query,
      form: params
    })
  }
  // 撤回审核
  async resetAudit (opt) {
    await this.core.getToken()
    const query = {
      // 是：接口调用凭证
      access_token: this.core.accessToken
    }
    const url = '/wxaapi/broadcast/goods/resetaudit'
    const params = {
      // 是：商品名称，最长14个汉字，1个汉字相当于2个字符
      goodsId: opt.goodsId,
      // 是：商品名称，最长14个汉字，1个汉字相当于2个字符
      auditId: opt.auditId
    }
    return this.core.ajaxAsync({
      url: this.core.uri + url,
      method: 'POST',
      qs: query,
      form: params
    })
  }
  // 重新提交审核
  async reAudit (opt) {
    await this.core.getToken()
    const query = {
      // 是：接口调用凭证
      access_token: this.core.accessToken
    }
    const url = '/wxaapi/broadcast/goods/audit'
    const params = {
      // 是：商品ID
      goodsId: opt.goodsId
    }
    return this.core.ajaxAsync({
      url: this.core.uri + url,
      method: 'POST',
      qs: query,
      form: params
    })
  }
  // 删除商品
  async deleteGoods (opt) {
    await this.core.getToken()
    const query = {
      // 是：接口调用凭证
      access_token: this.core.accessToken
    }
    const url = '/wxaapi/broadcast/goods/delete'
    const params = {
      // 是：商品ID
      goodsId: opt.goodsId
    }
    return this.core.ajaxAsync({
      url: this.core.uri + url,
      method: 'POST',
      qs: query,
      form: params
    })
  }
  // 更新商品
  async updateGoods (opt) {
    await this.core.getToken()
    const query = {
      goodsInfo: {
        // 是：填入mediaID（mediaID获取后，三天内有效）；图片mediaID的获取，请参考以下文档： https://developers.weixin.qq.com/doc/offiaccount/Asset_Management/New_temporary_materials.html；图片规则：图片尺寸最大300像素*300像素；
        coverImgUrl: opt.coverImgUrl,
        // 是：商品名称，最长14个汉字，1个汉字相当于2个字符
        name: opt.name,
        // 是：价格类型，1：一口价（只需要传入price，price2不传） 2：价格区间（price字段为左边界，price2字段为右边界，price和price2必传） 3：显示折扣价（price字段为原价，price2字段为现价， price和price2必传）
        priceType: opt.priceType,
        // 是：数字，最多保留两位小数，单位元
        price: opt.price,
        // 是：数字，最多保留两位小数，单位元
        price2: opt.price2,
        // 是：商品详情页的小程序路径，路径参数存在 url 的，该参数的值需要进行 encode 处理再填入
        url: opt.url,
        // 是：商品ID
        goodsId: opt.goodsId
      }
    }
    const url = '/wxaapi/broadcast/goods/update'
    const params = {
      // 是：商品ID
      goodsId: opt.goodsId
    }
    return this.core.ajaxAsync({
      url: this.core.uri + url,
      method: 'POST',
      qs: query,
      form: params
    })
  }
  // 获取商品状态
  async getGoodsStatus (opt) {
    await this.core.getToken()
    const query = {
      // 是：接口调用凭证
      access_token: this.core.accessToken
    }
    const url = '/wxa/business/getgoodswarehouse'
    const params = {
      // 是：商品ID
      goods_ids: opt.goods_ids
    }
    return this.core.ajaxAsync({
      url: this.core.uri + url,
      method: 'POST',
      qs: query,
      form: params
    })
  }
  // 获取商品列表
  async queryGoods (opt) {
    await this.core.getToken()
    const query = {
      // 是：接口调用凭证
      access_token: this.core.accessToken
    }
    const url = '/wxaapi/broadcast/goods/getapproved'
    const params = {
      // 是：分页条数起点
      offset: opt.offset,
      // 否：分页大小，默认30，不超过100
      limit: opt.limit,
      // 是：商品状态，0：未审核。1：审核中，2：审核通过，3：审核驳回
      status: opt.status
    }
    return this.core.ajaxAsync({
      url: this.core.uri + url,
      method: 'POST',
      qs: query,
      form: params
    })
  }
}
