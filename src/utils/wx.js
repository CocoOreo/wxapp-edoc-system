import { promisifyAll } from 'miniprogram-api-promise'

const wxp = {}
// promisify all wx's api
// 转换微信接口为Promise对象
promisifyAll(wx, wxp)

export default wxp
