import axios from 'axios'
import config from '../config'

axios.defaults.headers.post['Content-Type'] = 'application/json'

async function register (data, options = {}) {
  let result = await axios.post(`${config.authUrl}/register`, data, options)
  return result
}

async function login (data, options = {}) {
  let result = await axios.post(`${config.authUrl}/login`, data, options)
  return result
}

/**
 * 获取手机验证码
*/
async function getNumVcode (data, options = {}) {
  let result = await axios.get(`${config.authUrl}/vcode?phone=${data.phone}`, options)
  return result
}

/**
 * 验证手机验证码
*/
async function checkVcode (data, options = {}) {
  let result = await axios.post(`${config.authUrl}/vcode`, data, options)
  return result
}

/**
 * 手机验证码登录
*/
async function plogin (data, options = {}) {
  let result = await axios.post(`${config.authUrl}/plogin`, data, options)
  return result
}

export default {
  register,
  login,
  getNumVcode,
  checkVcode,
  plogin
}
