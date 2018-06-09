import * as getMake from '../services/make';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router'
import moment from 'moment';

export default {

	namespace: 'make',

	state: {
		makeList: [],//预约列表
		vipData:{},//vip传过来的数据
		queryFilter: {
			start: moment(),
			end: moment()
		}
	},

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(location => {
				const { pathname, query } = location;
				if (pathname == "/make") {
					dispatch({
						type: 'getMakeList'
					})

				}else if(pathname == '/make/addMake'){
					if(query){
						dispatch({
							type:'saveVipData',
							payload:query.vipData
						})
					}else{
						dispatch({
							type:'saveVipData',
							payload:{}
						})
					}
				}
			})
		}
	},

	effects: {
		*getMakeList({ payload }, { select, call, put }) {
			if(!payload){
				const queryFilter = yield select(({make}) => make.queryFilter)
				payload = {
					startTime: queryFilter.start.format('YYYY-MM-DD'),
					endTime: queryFilter.end.format('YYYY-MM-DD')
				}
			}
			//获取预约列表
			const data = yield call(getMake.getMakeList, payload);
			if(data[0] == 20000 || data[0] == 20001){
			    yield put({
					type:'updateState',
					payload: {
						makeList: data[2],
						queryFilter: {
							start: moment(payload.startTime),
							end: moment(payload.endTime)
						}
					}
				})
			}else{
				yield put({
					type:'updateState',
					payload: {
						makeList: data[2],
						queryFilter: {
							start: moment(payload.startTime),
							end: moment(payload.endTime)
						}
					}
				})
			    Toast.info(data[1], 0.8)
			}

		},
		*addMake({ payload }, { call, put }) {
			//添加预约
			const data = yield call(getMake.addMake, payload);
			if(data[0] == 20000){
			    yield put(routerRedux.push({
					pathname:'/make'
				}))
			    Toast.info(data[1], 0.8)
			}else{
			    Toast.info(data[1], 0.8)
			}

		},
		*confimComing({payload},{call,put}){
			const data = yield call(getMake.confimComing,payload)
			if(data[0] == 20000){
				yield put({
					type:'getMakeList',
          payload:{
            ...payload
          }
				})
			    Toast.info(data[1], 0.8)
			}else{
			    Toast.info(data[1], 0.8)
			}
		},
    *sendAppoMessage({payload},{call,put}){
      const data = yield call(getMake.sendAppoMessage,payload)
      if(data[0] == 20002){
        yield put({
          type:'getMakeList',
          payload:{
            ...payload
          }
        })
        Toast.info(data[1], 0.8)
      }else{
        Toast.info(data[1], 0.8)
      }
    },
    *sendWeChatAppoMessage({payload},{call,put}){
      const data = yield call(getMake.sendWeChatAppoMessage,payload)
      if(data[0] == 20003){
        yield put({
          type:'getMakeList',
          payload:{
            ...payload
          }
        })
        Toast.info(data[1], 0.8)
      }else{
        Toast.info(data[1], 0.8)
      }
    },
	},

	reducers: {
		saveMakeList(state, action) {
			return { ...state, makeList:action.payload };
		},
		saveVipData(state,action){
			return {...state,vipData:action.payload}
		},
		updateState(state, {payload}){
			return {...state, ...payload}
		}
	}

};
