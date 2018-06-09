import * as getOther from '../services/other';
import { Toast } from 'antd-mobile';
import moment from 'moment';
import { routerRedux } from 'dva/router'

export default {

	namespace: 'other',

	state: {
		otherList:[],//收支列表
		addCode:'',//收入编号
		outCode:'',//支出编号
		otherData:{},//销售数据
		employeeList:[],//操作人员
		historyList:[],//历史用途
		queryFilter: {
			start: moment(),
			end: moment()
		}
	},

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(location => {
				const { pathname, query } = location;
				if (pathname == "/other") {
					dispatch({
						type: 'getList'
					})
				}else if(pathname == '/other/addBill'){
					dispatch({
						type:'getAddInfo'
					})
					dispatch({
						type:'getOutCode'
					})
					dispatch({
						type: 'EmployeeList'
					})
					dispatch({
						type:'getHistoryList'
					})
				}
			})
		}
	},

	effects: {
		*getList({ payload }, { select, call, put }) {
			//获取收支列表
			if(!payload){
				const queryFilter = yield select(({other}) => other.queryFilter)
				payload = { 
					startTime: queryFilter.start.format("YYYY-MM-DD"), 
					endTime: queryFilter.end.format("YYYY-MM-DD") };
			}

			const data = yield call(getOther.chargeList,payload);
			if(data[0] == 20000 || data[0] == 20001){
				const resultData = data[2]
			    yield put({
					type:'updateState',
					payload: {
						otherList: resultData.list,
						otherData: {
							totalList: resultData.count,
							totalAmount: resultData.total
						},
						queryFilter: {
							start: moment(payload.startTime),
							end: moment(payload.endTime)
						}
					}
				})
			}else{
			    Toast.info(data[1], 0.8)
			}

		},
		*addCharge({payload},{call,put}){
			//新增收支

			const data = yield call(getOther.addCharge,payload)
			if(data[0] == 20000){
			    yield put(routerRedux.push({
					pathname:'/other'
				}))
			}else{

			    Toast.info(data[1], 0.8)
			}
		},
		*getAddInfo({payload},{call,put}){
			//获取收入编号
			const data = yield call(getOther.addInfo);
			if(data[0] == 20000){
			    yield put({
					type:'saveAddCode',
					payload:data[2].OrderID
				})
			}else{
			    Toast.info(data[1], 0.8)
			}
		},
		*getOutCode({payload},{call,put}){
			//获取收入编号
			const data = yield call(getOther.outCode);
			if(data[0] == 20000){
			    yield put({
					type:'saveOutCode',
					payload:data[2].OrderID
				})
			}else{
			    Toast.info(data[1], 0.8)
			}
		},
		*getCount({payload},{call,put}){
			//获取收支销售数据
			const data = yield call(getOther.countView);
			if(data[0] == 20000){
			    yield put({
					type:'saveOtherData',
					payload:data[2]
				})
			}else{
			    Toast.info(data[1], 0.8)
			}
		},
		*EmployeeList({payload},{call,put}){
			const data = yield call(getOther.EmployeeList)
			if(data[0] == 20000 || data[0] == 20001){
			    yield put({
					type:'saveEmployeeList',
					payload:data[2]
				})
			}else{
			    Toast.info(data[1], 0.8)
			}
		},
		*getHistoryList({payload},{call,put}){
			const data = yield call(getOther.applicationList);
			if(data[0] == 20000 || data[0] == 20001){
				yield put({
					type:'saveHistoryList',
					payload:data[2]
				})
			}else{
				Toast.info(data[1], 0.8)
			}
		}
	},

	reducers: {
		updateState(state, {payload}){
			return {...state, ...payload}
		},
		saveHistoryList(state,action){
			return {...state,historyList:action.payload}
		},
		saveList(state, action) {
			return { ...state, otherList:action.payload };
		},
		saveAddCode(state,action){
			return {...state,addCode:action.payload}
		},
		saveOutCode(state,action){
			return {...state,outCode:action.payload}
		},
		saveOtherData(state,action){
			return {...state,otherData:action.payload}
		},
		saveEmployeeList(state,action){
			return {...state,employeeList:action.payload}
		}
	}

};
