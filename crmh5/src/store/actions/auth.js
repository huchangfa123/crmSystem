import auth from '../../api/auth'
import config from '../../config'

export async function register ({commit}, data) {
  let result = await auth.register(data)
  return result
}

export async function login ({commit}, data) {
  let result = await auth.login(data)
  sessionStorage.setItem('actoken', `${result.data.token}`)
  config.headers['Authorization'] = `Bearer ${result.data.token}`
  return result
}
