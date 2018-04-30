import axios from 'axios'
import config from '../config'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers['Authorization'] = config.headers.Authorization

/**
 * 获取用户信息
*/
console.log('123', config.headers.Authorization)
async function getUserData (options = {}) {
  let result = await axios.get(`${config.apiUrl}/user`, options)
  return result
}

export default {
  getUserData
}
