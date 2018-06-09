import request from '../../utils/request';

/**
 * 登录
 */
// http://192.168.18.60:8080/breadtree/mobile/login
export async function login(params) {
  return request('POST','/login/loginAuth',params);
}

/**
 * 获取首页商铺名称
 */
export async function getHospital(params) {
  return request('POST','/Hospital/hospitalList',params);
}


/**
 * 获取首页数据
 */
export async function getIndexData(params) {
  return request('POST','/Incomecollect/h5HomeCount',params);
}
