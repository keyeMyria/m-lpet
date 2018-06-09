import * as getSearch from '../services/searchSell';
import { Toast } from 'antd-mobile';
import moment from 'moment';
const start = moment();
const end = moment();

export default {

	namespace: 'searchSell',

	state: {
		sellList:[],//查询销售
		billDetail:{
			billResutl:{},
			consumptionResult:[]
		},//详情
		total:{},
	},

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(location => {
				const { pathname, query } = location;
				if (pathname == "/searchSell") {
					dispatch({
						type: 'searchSell'
					})
				}else if(pathname == "/searchSell/orderDetails"){
					dispatch({
						type:'getBillDetails',
						payload: query && query.id
					})
				}
			})
		}
	},

	effects: {
		*searchSell({ payload }, { call, put }) {
			const info = payload ? payload : {startTime:moment(start).format('YYYY-MM-DD'),endTime:moment(end).format('YYYY-MM-DD')}
			const data = yield call(getSearch.billList, info);
			if(data[0] == 20000 || data[0] == 20001){
				yield put({
					type: 'updateState',
					payload: {
						sellList: data[2].result,
						total: {
							Paypal: data[2].Paypal,
							Total: data[2].Total
						}
					}
				})
			    yield put({
					type:'getSellList',
					payload:data[2].result
				})
			}else{
				yield put({
					type:'getSellList',
					payload:data[2]
				})
			    Toast.info(data[1], 0.8)
			}

		},
		*billListTotal({payload},{call,put}){
			const data = yield call(getSearch.billListTotal);
			if(data[0] == 20000){
			    yield put({
					type:'saveTotal',
					payload:data[2].billTotal
				})
			}else{
			    Toast.info(data[1], 0.8)
			}
		},
		*getBillDetails({payload},{call,put}){
			if(!payload){
				payload = sessionStorage.searchSell_order_detail_id
			}

			const data = yield call(getSearch.billDetail,{His_Bill_Mid:payload});
			sessionStorage.searchSell_order_detail_id = payload
			if(data[0] == 20000){
			    yield put({
					type:'saveBillDetails',
					payload:data[2]
				})
			}else{
				yield put({type: 'saveBillDetails', payload: {}})
			    Toast.info(data[1], 1.2)
			}
		}
	},

	reducers: {
		updateState(state, {payload}){
			return {...state, ...payload}
		},
		getSellList(state, action) {
			return { ...state, sellList:action.payload };
		},
		saveBillDetails(state,action){
			return {...state,billDetail:action.payload}
		},
		saveTotal(state,action){
			return {...state,total:action.payload}
		}
	}

};
