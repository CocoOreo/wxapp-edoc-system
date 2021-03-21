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
    let res // 作为压缩的返回对象
    if (file.size && file.size > 1024 * 2) {
      res = await wx.compressImage({
        src: file.url, // 图片路径
        quality: 80 // 压缩质量
      })
      // res返回的临时文件地址没有后缀，这里人工加上后缀
      let ext = file.url.substring(file.url.lastIndexOf('.') + 1)
      res.url = res.tempFilePath + '.' + ext
      res.ext = ext
    }
    const upTask = await wx.uploadFile({
      url: baseUrl + '/content/upload',
      filePath: res.tempFilePath || file.url,
      name: 'file',
      header: {
        'Authorization': 'Bearer ' + token
      },
      formData: {
        ...res || file
      }
    })
    if (upTask.statusCode === 200) {
      return JSON.parse(upTask.data)
    }
  } catch (error) {
    console.log('UploadImg -> error', error)
  }
}
