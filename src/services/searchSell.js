import request from '../utils/request';

/**
 * 查询销售列表
 */
export async function billList(params) {
  return request('POST','/Commodity/billList',params);
}

/**
 * 账单详情信息
 */
export async function billDetail(params) {
  return request('POST','/Commodity/billDetail',params);
}



/**
 * 获取销售总额
 */
export async function billListTotal(params) {
  return request('POST','/Commodity/billListTotal',params);
}