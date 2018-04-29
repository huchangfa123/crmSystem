export default {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.getItem('actoken')
  },
  apiUrl: 'http://39.108.159.0/api/auth',
  authUrl: 'http://39.108.159.0/api/v1'
}
