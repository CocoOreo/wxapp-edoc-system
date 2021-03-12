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

const submitNewDoc = (data) => axios.post('/content/newDoc', data)

export { reg, submitNewDoc }
