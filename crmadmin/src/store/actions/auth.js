import auth from '../../api/auth'
import config from '../../config'
import api from '../../api/normal'

export async function login ({commit}, data) {
  let result = await auth.login(data)
  sessionStorage.setItem('actoken', `${result.data.token}`)
  config.headers['Authorization'] = `Bearer ${result.data.token}`
  api.setAuthorization(`Bearer ${result.data.token}`)
  return result
}
