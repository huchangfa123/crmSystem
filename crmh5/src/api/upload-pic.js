import axios from 'axios'

function uploadPic (data) {
  let options = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  let result = axios.post('http://upload-z2.qiniup.com', data, options)
  return result
}

export default {
  uploadPic
}
