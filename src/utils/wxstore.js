import wx from './wx'

class Storage {
  constructor (key) {
    this.key = key
  }

  async set (data) {
    const result = await wx.setStorage({
      key: this.key,
      data: data
    })
    return result
  }

  async get () {
    let result = ''
    try {
      result = await wx.getStorage({ key: this.key })
    } catch (error) {
    }
    return result.data ? result.data : result
  }
}

const StoreToken = new Storage('token')
const StoreUser = new Storage('user')

export { Storage, StoreToken, StoreUser }
