import request from '../utils/request';

/**
 * 会员列表(默认 1.消费2.储蓄)
 */
export async function getVipList(params) {
 /* return request('POST','/Consumer/consumerDetailList',params);*/
  return request('POST','/Consumer/consumerDetailList',params);
}


/**
 * 添加会员办卡（储蓄卡）
 */
export async function AddVipCard(params) {
  return request('POST','/Consumer/consumerAddCard',params);
}

/**
 * 添加会员办卡（次卡）
 */
export async function AddMetercard(params) {
  return request('POST','/Consumer/consumerAddMetercardH5',params);
}


/**
 * 获取卡类型列表
 */
export async function getCardType(params) {
  return request('POST','/Cardtype/CardtypeList',params);
}

/**
 * 获取次卡类型列表
 */
export async function getMeterCardType(params) {
  return request('POST','/Cardtype/MeterCardTypeList',params);
}

/**
 * 卡号列表
 */
export async function getCardCode(params) {
  return request('POST','/Consumer/getConsumerCard',params);
}

//0：现金，1：银行卡，2：支付宝，3：微信支付，4：会员卡，5：预收款，6：预付款，7：押金

/**
 * 会员卡充值（储蓄卡）
 */
export async function updateCard(params) {
  /*return request('POST','/Consumer/consumerUpdateCardH5',params);*/
  return request('POST','/Consumer/rechargeCard',params);
}



/**
 * 会员卡充值（次卡）
 */
export async function updateMeterCard(params) {
  return request('POST','/Consumer/fillMetercardH5',params);
}


/**
 * 销售人员列表
 */
export async function getEmployeeRole(params) {
  return request('POST','/Employee/getEmployeeRole',params);
}

/**
 * 新增会员
 */
export async function addVip(params) {
  return request('POST','/Consumer/saveConsumerPets',params);
}
