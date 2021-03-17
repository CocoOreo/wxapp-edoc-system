import { axios } from '@/utils/request'
import { StoreToken } from '@/utils/wxstore'

/**
 * 注册接口
 * @param {*} regInfo 用户注册信息
 */
const reg = (regInfo) => {
  return axios.post('/login/reg', {
    ...regInfo
  })
}

/**
 * 重置密码接口
 * @param {*} info 重置密码信息
 */

const addNewDoc = (data) => axios.post('/content/wxAdd', data)

const getList = async (options) => {
  return axios.get('/content/list', options)
}

// 获取文章详情
const getDetail = async (tid) => {
  // const token = store.state.token
  const token = await StoreToken.get()
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  }
  return axios.get('/content/detail', {tid}, headers)
}

export { reg, addNewDoc, getList, getDetail }
