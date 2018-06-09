import request from '../utils/request';

/**
 * 获取商品分类
 */
export async function getType(params) {
  return request('POST','/Commodity/getCategory',params);
}

/**
 * 获取商品列表
 */
export async function getData(params) {
  return request('POST','/Commodity/getCommodityBySbucategory',params);
}

/**
 * 搜索商品
 */
export async function searchData(params) {
  return request('POST','/Commodity/searchCommodity',params);
}

/**
 * 添加商品    {"Id":"1","addNumber":"2","salePrice":"12","Con_Category_Id":"12"}
 */
export async function addcart(params) {
  return request('POST','/Commodity/addcart',params);
}

/**
 * 商品列表,商品搜索
 */
export async function getManageList(params) {
  return request('POST','/Commodity/searchCommodity',params);
}

/**
 * 获取订单
 */
export async function getCartData(params) {
  return request('POST','/Commodity/getcartdata',params);
}

/**
 * 获取初始化的订单数量
 */
export async function getIniCat(params) {
  return request('POST','/Commodity/getIniCat',params);
}

/**
 * 销售人员列表
 */
export async function getEmployeeRole(params) {
  return request('POST','/Employee/getEmployeeRole',params);
}

/**
 * 提交订单
 */
export async function recordBill(params) {
  return request('POST','/Settlement/recordOrder',params);
}

/**
 * 完成支付
 */
export async function payment(params) {
  return request('POST','/Settlement/payment',params);
}

/**
 * 获取会员卡列表
 */
export async function cardList(params) {
  return request('POST','/Consumer/consumerCardList',params);
}

/**
 * 清空商品
 */
export async function cleanCat(params) {
  return request('POST','/Commodity/cleanCat',params);
}

/**
 * 获取大类下的分类
 */
export async function getCategory(params) {
  return request('POST','/Commoditygory/getCategory',params);
}

/**
 * 上传图片
 */
export async function uploadImg(params) {
  return request('POST','/Upload/commodity',params,true);
}

/**
 * 添加商品
 */
export async function addCommodity(params) {
  return request('POST','/Commodity/addCommodity',params);
}

/**
 * 获取供应商
 * @param params
 * @returns {Promise}
 */
export async function getCompany(params) {
  return request('POST','/Commoditygory/getCompany',params);
}

/**
 * 获取客户的会员卡折扣设置折扣
 */
export async function queryVipOffSetList(params) {
  return request('POST','/Consumer/consumerCardList',params);
}

/**
 * 获取微信配置信息
 */
export async function getConfig(params) {
  return request('POST','/Wechat/wechatJssdk',params);
}
