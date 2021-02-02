import BizDataCrypt from './BizDataCrypt'

export default class Base {
  constructor (core) {
    this.core = core
  }
  decryptData (encryptedData, iv, sessionKey) {
    const bdc = new BizDataCrypt(this.core.config.appid, sessionKey)
    const data = bdc.decrypt(encryptedData , iv)
    return data
  }
}
