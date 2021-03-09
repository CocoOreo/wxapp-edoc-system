import config from '@/config/index'
import wx from '@/utils/wx'
import { StoreToken } from '@/utils/wxstore'

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? config.baseUrl.dev
    : config.baseUrl.pro

export const uploadImg = async (file) => {
  try {
    // 获取用户信息
    const token = await StoreToken.get()
    console.log('打印一下FILE的url', file.url)
    const upTask = await wx.uploadFile({
      url: baseUrl + '/content/upload',
      filePath: file.url,
      name: 'file',
      header: {
        'Authorization': 'Bearer ' + token
      },
      formData: {
        file
      }
    })
    if (upTask.statusCode === 200) {
      return JSON.parse(upTask.data)
    }
  } catch (error) {
    console.log('UploadImg -> error', error)
  }
}
