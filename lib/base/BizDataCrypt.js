import crypto from 'crypto'

class BizDataCrypt {
  constructor (appid, sessionKey) {
    this.appid = appid
    this.sessionKey = sessionKey
  }
  decrypt (encryptedData, iv) {
    const sessionKey = new Buffer.from(this.sessionKey, 'base64')
    encryptedData = new Buffer.from(encryptedData, 'base64')
    iv = new Buffer.from(iv, 'base64')
    let decoded
    try {
      // 解密
      const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true)
      decoded = decipher.update(encryptedData, 'binary', 'utf8')
      decoded += decipher.final('utf8')
      decoded = JSON.parse(decoded)
    } catch (err) {
      throw new Error(err)
    }
    if (decoded.watermark.appid !== this.appid) {
      throw new Error('Illegal Buffer')
    }
    return decoded
  }
}

export default BizDataCrypt
