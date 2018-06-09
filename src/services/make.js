import request from '../utils/request';

/**
 * 预约列表
 */
export async function getMakeList(params) {
  return request('POST','/Appointment/appointmentList',params);
}


/**
 * 添加预约
 */
export async function addMake(params) {
  return request('POST','/Appointment/addAppointment',params);
}

/**
 * 确认到店
 */
export async function confimComing(params) {
  return request('POST','/Appointment/confimComing',params);
}

/**
 * 短信预约
 * @param params
 * @returns {Promise}
 */
export async function sendAppoMessage(params) {
  return request('POST','/Appointment/sendAppointmentMessage',params);
}

/**
 * 微信预约
 * @param params
 * @returns {Promise}
 */
export async function sendWeChatAppoMessage(params) {
  return request('POST','/Appointment/sendWeChatAppointmentMessage',params);
}
