
import { axios } from '@/utils/request'

// 增加用户分享者
const addShareWith = (data) => axios.post('/content/addDocShareWith', data)

export { addShareWith }
