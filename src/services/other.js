import request from '../utils/request';

/**
 * 获取收支列表
 */
export async function chargeList(params) {
/*  return request('POST','/Charge/chargeList',params);*/
  return request('POST','/Charge/chargeListforH5',params);
}


/**
 * 新增收支    1收入   -1支出
 */
export async function addCharge(params) {
  /*return request('POST','/Charge/chargeAddH5',params);*/
  return request('POST','/Charge/chargeAdd',params);
}

/**
 * 获取收支编号
 */
export async function outCode(params) {
  return request('POST','/Charge/chargeOutCode',params);
}

/**
 * 获取收入编号
 */
export async function addInfo(params) {
  return request('POST','/Charge/chargeAddInfo',params);
}

/**
 * 获取销售数据
 */
export async function countView(params) {
  return request('POST','/Charge/countView',params);
}
/**
 * 获取操作人员
 */
export async function EmployeeList(params) {
  return request('POST','/Commodity/EmployeeList',params);
}

/**
 * 获取历史用途
 */
export async function applicationList(params) {
  return request('POST','/Charge/applicationList',params);
}
