import request from '../utils/request';

/**
 * 商品列表,商品搜索
 */
export async function getManageList(params) {
  return request('POST','/Commodity/searchCommodity',params);
}

/**
 * 获取商品编号
 * @param params
 * @returns {Promise}
 */
export async function getCommodityCode(params) {
  return request('POST','/Commodity/getCommodityCode',params);
}

/**
 * 获取大类
 */
export async function getCategory(params) {
  return request('POST','/Commodity/getCategory',params);
}

/**
 * 获取子类
 */
export async function getCommodityBySbucategory(params) {
  return request('POST','/Commoditygory/getCategory',params);
}

/**
 * 新增大类
 */
export async function addCategory(params) {
  return request('POST','/Commoditygory/addCategory',params);
}

/**
 * 新增类别
 */
export async function addCategoryNew(params) {
  //return request('POST','/Commoditygory/addCategoryNew',params);
  return request('POST','/Commoditygory/addCategorytow',params);
}

/**
 * 删除类别
 */
export async function deleteCategory(params) {
  return request('POST','/Commoditygory/deleteCategory',params);
}

/**
 * 编辑类别
 */
export async function CategoryUpdate(params) {
  return request('POST','/Commoditygory/CategoryUpdate',params);
}

/**
 * 添加商品
 */
export async function addCommodity(params) {
  return request('POST','/Commodity/addCommodity',params);
}

/**
 * 获取商品分类
 */
export async function getCategoryForCommodity(params) {
  return request('POST','/Commodity/getCategoryForCommodity',params);
}


/**
 * 获取商品库存和总价
 */
export async function getCommdityStock(params) {
  return request('POST','/Commodity/commdityStock',params);
}

/**
 * 上传图片
 */
export async function uploadImg(params) {
  return request('POST','/Upload/commodity',params,true);
}

/**
 * 删除商品
 */
export async function deleteCommodity(params) {
  return request('POST','/Commoditygory/deleteCommodity',params);
}

/**
 * 编辑商品
 */
export async function commodityUpdate(params) {
  return request('POST','/Commoditygory/commodityUpdateh5',params);
}
