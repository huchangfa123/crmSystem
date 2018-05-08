function getTime (val) {
  var date = ''
  if (val) {
    date = new Date(val)
  } else {
    date = new Date()
  }
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}

function checkPhone (val) {
  let reg = /^1[3|4|5|7|8][0-9]{9}$/
  return reg.test(parseInt(val))
}

function checkName (val) {
  let reg = /^[\u4e00-\u9fa5]{2,4}$/
  return reg.test(val)
}

function checkidCard (val) {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(val)
}

function convertBase64UrlToBlob (urlData) {
  var bytes = window.atob(urlData.split(',')[1])
  var ab = new ArrayBuffer(bytes.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], { type: 'image/png' })
}
module.exports = {
  getTime,
  checkPhone,
  checkName,
  checkidCard,
  convertBase64UrlToBlob
}
