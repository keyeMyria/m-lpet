import * as getLogin from '../services/login/index.js';
import * as tallys from '../services/tally';
import { Toast, Popup } from 'antd-mobile';
import Cookie from 'js-cookie';
import { routerRedux } from 'dva/router'

export default {

	namespace: 'index',

	state: {
		indexData:{},
    hospitalInfo:{}
	},

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(location => {
				Popup.hide()
				
				const { pathname, query } = location;
				const token = Cookie.get('token');
				if(!token){
					dispatch(routerRedux.push({
						pathname:'/login'
					}))
				} else if (pathname == '/') {
					dispatch({
						type:'getIndexData'
					})
          dispatch({
            type:'getHospital'
          })

				}

				dispatch({
					type:'getConfig'
				})


			})
		}
	},

	effects: {
		*getConfig({payload},{call,put}){
      const url = window.location.href;
      const info = {
        url
      }
      const data = yield call(tallys.getConfig,info)
      if(data[0] == 20000){
        const configData = data[2];
          window.wx.config({
            appId:configData.appId,
            timestamp:configData.timestamp,
            nonceStr:configData.nonceStr,
            signature:configData.signature,
            jsApiList:[
              'scanQRCode'
            ]
          })
      }
    },
		*getIndexData({ payload }, { call, put }) {
			const data = yield call(getLogin.getIndexData);
			if (data[0] == 20000) {
				yield put({
					type:'saveIndex',
					payload:data[2]
				})
			} else {
				Toast.info(data[1], 0.8)
			}

		},
    *getHospital({ payload }, { call, put }) {
      const data = yield call(getLogin.getHospital);
      if (data[0] == 20000) {
        yield put({
          type:'updateState',
          payload:{
            hospitalInfo:data[2]
          }
        })
      } else {
        Toast.info(data[1], 0.8)
      }

    },
	},

	reducers: {
		saveIndex(state, action) {
			return { ...state, indexData:action.payload };
		},
    updateState(state, {payload}) {
      return { ...state, ...payload };
    }
	}

};
