import config from '@/config/index'
import wx from '@/utils/wx'
import { StoreToken } from '@/utils/wxstore'
// import {testUpload} from '../api/login'

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? config.baseUrl.dev
    : config.baseUrl.pro

export const uploadImg = async (file) => {
  try {
    // 获取用户信息
    const token = await StoreToken.get()
    console.log('打印一下FILE的url', file.url)
    console.log('测试上传接口', file)
    // const test = await testUpload({ ...file })
    // console.log(test)
    // console.log('下面是正常接口')
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
      console.log('微信侧完成')
      return JSON.parse(upTask.data)
    }
  } catch (error) {
    console.log('UploadImg -> error', error)
  }
}
