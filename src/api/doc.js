import { axios } from '@/utils/request'

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

export { reg, addNewDoc }
