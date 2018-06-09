import * as getLogin from '../services/login/index.js';
import {Toast} from 'antd-mobile';
import Cookie from 'js-cookie';
import { routerRedux } from 'dva/router'


export default {

  namespace: 'system',

  state: {
      
  },

  subscriptions: {
    setup({ dispatch, history }) {
        
    }
  },

  effects: {
    *submit({payload},{call,put}){
        const data = yield call(getLogin.login,payload);
        if(data[0] == 20000){
            Cookie.set('token',data[2])
            yield put(routerRedux.push({
                pathname:'/'
            }))
            Toast.info('登录成功', 1);
        }else{
            Toast.info(<div>
                    <img style={{width:'0.9rem',height:'0.9rem',marginTop:'0.2rem',marginBottom:'0.2rem'}} src={require('../assets/tip_img.png')} alt=""/>
                    <div>{data[1]}</div>
                </div>, 1)
        }
    }
  },

  reducers: {

  }

};
