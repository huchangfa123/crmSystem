import axios from 'axios'
import config from '../config'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers['Authorization'] = config.headers.Authorization

function setAuthorization (token) {
  axios.defaults.headers['Authorization'] = token
}

/**
 * 添加商品
*/
async function addGoods (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/goods`, data, options)
  return result
}

/**
 * 获取商品列表
*/
async function getGoodsList (options = {}) {
  let result = await axios.get(`${config.apiUrl}/goods/all`, options)
  return result
}

/**
 * 删除商品
*/
async function delGoods (data, options = {}) {
  let result = await axios.delete(`${config.apiUrl}/goods/${data.id}`, options)
  return result
}

/**
 * 编辑商品
*/
async function editGoods (data, options = {}) {
  let result = await axios.put(`${config.apiUrl}/goods/${data.id}`, data, options)
  return result
}

/**
 * 获取用户列表
*/
async function getUserList (data, options = {}) {
  console.log(data)
  let result = await axios.post(`${config.apiUrl}/user/list`, data, options)
  return result
}

/**
 * 获取等级提升审核列表
*/
async function getReviewList (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/level`, data, options)
  return result
}

/**
 * 处理等级提升
*/
async function dealLevelUpApply (data, options = {}) {
  let result = await axios.put(`${config.apiUrl}/level/${data.id}`, data, options)
  return result
}

/**
 * 获取订单列表
*/
async function getOrderList (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/order/list`, data, options)
  return result
}

/**
 * 生成用户
*/
async function addUser (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/user`, data, options)
  return result
}

/**
 * 修改用户上级
*/
async function editBoss (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/user/manage`, data, options)
  return result
}

/**
 * 提交公告
*/
async function submitAnnouncement (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/announcement`, data, options)
  return result
}

/**
 * 获取云盘数据
*/
async function getYunData (data, options = {}) {
  let result = await axios.get(`${config.appUrl}/public`, data, options)
  return result
}

/**
 * 添加云盘数据
*/
async function addYunData (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/public`, data, options)
  return result
}

/**
 * 修改云盘数据
*/
async function editYunData (data, options = {}) {
  let result = await axios.put(`${config.apiUrl}/public/${data.id}`, data, options)
  return result
}

/**
 * 获取盈利数据
*/
async function getProfitData (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/${data.urlType}`, data, options)
  return result
}

/**
 * 获取图片token
*/
async function getPicToken (data, options = {}) {
  let result = await axios.post(`${config.apiUrl}/uploadToken`)
  return result
}

export default {
  setAuthorization,
  addGoods,
  getGoodsList,
  delGoods,
  editGoods,
  addUser,
  getUserList,
  submitAnnouncement,
  getReviewList,
  dealLevelUpApply,
  getOrderList,
  getYunData,
  addYunData,
  editYunData,
  editBoss,
  getProfitData,
  getPicToken
}
