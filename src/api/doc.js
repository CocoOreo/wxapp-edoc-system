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

/**
 * 增加一份电子文档
 * @param {*} data
 * @returns
 */

const addNewDoc = (data) => axios.post('/content/wxAdd', data)

const updateDoc = (data) => axios.post('/content/wxUpdate', data)

const deleteDoc = (data) => axios.post('/content/wxDelete', data)

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

// 下载PDF
const downloadPDF = async (tid) => {
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
  return axios.post('/content/downloadPDF', {tid}, headers)
}
export { reg, addNewDoc, getList, getDetail, downloadPDF, updateDoc, deleteDoc }
