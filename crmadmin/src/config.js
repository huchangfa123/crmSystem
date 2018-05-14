export default {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('actoken')}`
  },
  apiUrl: 'http://39.108.159.0/api/mana',
  authUrl: 'http://39.108.159.0/api/v1',
  appUrl: 'http://39.108.159.0/api/auth'
}
