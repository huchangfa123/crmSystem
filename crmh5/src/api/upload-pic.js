import axios from 'axios'

async function uploadPic (data) {
  let options = {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Authorization': `UpToken ${data.upload_token}`
    }
  }
  console.log(data.upload_token)
  let result = await axios.post('https://upload-z2.qiniup.com/putb64/232123', data.file, options)
  return result
}

export default uploadPic
