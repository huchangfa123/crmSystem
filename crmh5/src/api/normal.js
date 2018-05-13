import axios from 'axios'
import config from '../config'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers['Authorization'] = config.headers.Authorization

function setAuthorization (token) {
  axios.defaults.headers['Authorization'] = token
}

/**
 * 获取用户信息
*/
async function getUserData (options = {}) {
  let result = await axios.get(`${config.apiUrl}/user`, options)
  return result.data
}

/**
 * 获取收货地址
*/
async function getAddressList (options = {}) {
  let result = await axios.get(`${config.apiUrl}/address`, options)
  return result.data
}

/**
 * 添加收货地址
*/
async function addAddress (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/address`, data, options)
  return result
}

/**
 * 删除收货地址
*/
async function delAddress (data, options = {}) {
  let result = await axios.delete(`${config.apiUrl}/address/${data.id}`, options)
  return result.data
}

/**
 * 修改收货地址
*/
async function editAddress (data, options = {}) {
  let result = await axios.put(`${config.apiUrl}/address/${data.id}`, data, options)
  return result
}

/**
 * 修改默认地址
*/
async function setDefaultAddress (data, options = {}) {
  let result = await axios.put(`${config.apiUrl}/address/default/${data.id}`, options)
  return result
}

/**
 * 获取所有商品
*/
async function getGoodsList (data, options = {}) {
  let result = await axios.get(`${config.apiUrl}/goods`, options)
  return result
}

/**
 * 获取上传图片token
*/
async function UploadPic (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/upBase64`, data, options)
  return result
}

/**
 * 获取未读信息
*/
async function getUnreadList (data, options = {}) {
  let result = await axios.get(`${config.apiUrl}/mess`, options)
  return result
}

/**
 * 获取所有信息
*/
async function getMessageList (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/messAll`, data, options)
  return result
}

/**
 * 所有信息标记已读
*/
async function cleanMess (data, options = {}) {
  let result = await axios.get(`${config.apiUrl}/messClean`, options)
  return result
}

/**
 * 生成订单
*/
async function createOrder (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/order`, data, options)
  return result
}

/**
 * 查看我的下单
*/
async function getMyBuyOrder (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/order/checkOrder`, data, options)
  return result
}

/**
 * 查看我的订单
*/
async function getMyOrder (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/order/checkBill`, data, options)
  return result
}

/**
 * 修改订单状态
*/
async function updateOrderState (data, options = {}) {
  let result = await axios.put(`${config.apiUrl}/order/${data.id}`, data, options)
  return result
}

/**
 * 查看我的推荐
*/
async function getMyRecommend (data, options = {}) {
  let result = await axios.get(`${config.apiUrl}/recommend`, options)
  return result
}

/**
 * 查看我的下级
*/
async function getMyLowerLevel (data, options = {}) {
  let result = await axios.get(`${config.apiUrl}/subUser/${data.id}`)
  return result
}

/**
 * 查看差价利润
*/
async function getProfitList (data, options = {}) {
  let result = await axios.get(`${config.apiUrl}/goods/profit`, options)
  return result
}

/**
 * 等级提升
*/
async function levelUp (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/level`, data, options)
  return result
}

/**
 * 我的升级记录
*/
async function myUpgradeList (data, options = {}) {
  let result = await axios.get(`${config.apiUrl}/level`, options)
  return result
}

/**
 * 下级升级记录
*/
async function otherUpgradeList (data, options = {}) {
  let result = await axios.get(`${config.apiUrl}/sublevel`, options)
  return result
}

/**
 * 修改用户资料
*/
async function editUserMessage (data, options = {}) {
  let result = await axios.put(`${config.apiUrl}/user/${data.id}`, data, options)
  return result
}

export default {
  getUserData,
  getAddressList,
  setAuthorization,
  addAddress,
  delAddress,
  editAddress,
  setDefaultAddress,
  getGoodsList,
  UploadPic,
  getUnreadList,
  getMessageList,
  cleanMess,
  createOrder,
  getMyBuyOrder,
  getMyOrder,
  getMyRecommend,
  getMyLowerLevel,
  updateOrderState,
  getProfitList,
  levelUp,
  myUpgradeList,
  otherUpgradeList,
  editUserMessage
}
