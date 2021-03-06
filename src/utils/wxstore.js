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
    console.log('进入到GetStore')
    let result = ''
    try {
      result = await wx.getStorage({ key: this.key })
    } catch (error) {
      console.log('Storage -> get -> error', error)
    }
    return result.data ? result.data : result
  }
}

const StoreToken = new Storage('token')
const StoreUser = new Storage('user')

export { Storage, StoreToken, StoreUser }
