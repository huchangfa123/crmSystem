import axios from 'axios'
import config from '../config'

axios.defaults.baseURL = config.authUrl
axios.defaults.headers.post['Content-Type'] = 'application/json'

async function register (data, options = {}) {
  let result = await axios.post('/register', data, options)
  return result
}

async function login (data, options = {}) {
  let result = await axios.post('/login', data, options)
  return result
}

export default {
  register,
  login
}
