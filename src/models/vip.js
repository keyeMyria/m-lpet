import * as getVip from '../services/vip';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router'

export default {

	namespace: 'vip',

	state: {
		vipList: [],
		dogInfoData: [],//宠物信息添加
		i: 0,//递增id
		userId:'',//用户id
		cardTypeList:[],
		meterCardTypeList: [], //次卡类型列表
		cardTypeId:'',//卡类型id
		cardTypeName:'',//卡类型名字
		dateName:'',//有效期时间
		cardCodeList:[],//卡号列表
		cardCodeName:'',//卡号
		cardCodeId:'',//卡id
		vipName:'',//会员姓名
		sellList:[],//销售人员列表
		sellName:'',//选中销售人员
		sellId:'',//选中销售人员id
		isVip:'',//vip选择进入1:确认订单页面   2:新增预约页面
		selectedSegmentIndex:0,
	},

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(location => {
				const { pathname, query } = location;
					if(query){
						dispatch({
							type:'getVipStatus',
							payload:query.isVip
						})
					}

					dispatch({
						type: 'getVipList'
					})
					dispatch({
						type:'clearDogInfoData'
					})
				if (pathname == "/vipList") {
					dispatch({
						type: 'getVipList'
					})
					dispatch({
						type:'clearDogInfoData'
					})
				}else if(pathname == '/vipList/vipCard'){
					if(query && query.userId){
						dispatch({
							type:'saveUserId',
							payload:query.userId
						})
					}
					dispatch({type:'getCardTypeList'})
					dispatch({type:'getMeterCardTypeList'})
				}else if(pathname == '/vipList/vipRefill'){
					dispatch({
						type:'changeCardCode',
						payload:{id:'',code:''}
					})
					if(query){
						dispatch({
							type:'saveUserId',
							payload:query.userId
						})
						dispatch({
							type:'getCardCode',
							payload:query.userId
						})
						dispatch({
							type:'saveVipName',
							payload:query.vipName
						})
					}
					dispatch({
						type:'getEmployeeRole'
					})
				}else if(pathname == '/vipList/addVip'){
					dispatch({
						type:'addDogInfoData'
					})
				}else if(pathname == '/vipList/vipDetail'){
					console.log(location)
				}

			})
		}
	},

	effects: {
		*getVipList({ payload }, { select,call, put }) {
			//获取会员列表
			const selectedSegmentIndex = yield select(({vip}) => vip.selectedSegmentIndex)

			const data = yield call(getVip.getVipList, {keyword:payload,Type:selectedSegmentIndex});
			if (data[0] == 20000) {
				yield put({
					type: 'getList',
					payload: data[2]
				})
			} else {
				yield put({
					type: 'getList',
					payload: data[2]
				})
				// Toast.info(data[1], 0.8)
			}
		},
		*addVipCard({ payload }, { select , call, put }) {
			//添加会员卡
			const {cardTypeIndex,dataInfo} = payload;
			const vip = yield select(({vip}) => vip)
			if(cardTypeIndex == 1){
				const info = {
					...dataInfo,
					His_Consumer_Mid:vip.userId,//用户id
					CardType:vip.cardTypeName,//卡类型
					Sys_CardType_Mid:vip.cardTypeId//卡id
				}
				const data = yield call(getVip.AddVipCard, info);
				if (data[0] == 20000) {
					Toast.info(data[1],1)
					yield put(routerRedux.push({
						pathname:'/vipList'
					}))
				} else {
					Toast.info(data[1], 0.8)
				}
			}else{
				const info = {
					...dataInfo,
					His_Consumer_Mid:vip.userId,
					CardType:vip.cardTypeName,
					His_MeterCardType_Mid:vip.cardTypeId,
					OverTime:vip.dateName,
				}
				const data = yield call(getVip.AddMetercard, info);
				if (data[0] == 20000) {
					Toast.info(data[1],1)
					yield put(routerRedux.push({
						pathname:'/vipList'
					}))
				} else {
					Toast.info(data[1], 0.8)
				}
			}

		},
		*getCardTypeList({payload},{call,put}){
			//获取卡类型列表
			const data = yield call(getVip.getCardType);
			if (data[0] == 20000) {
				yield put({
					type: 'saveCardTypeList',
					payload: data[2]
				})
			} else {
				Toast.info(data[1], 0.8)
			}
		},
		/**
		 * 获取次卡类型
		 */
		*getMeterCardTypeList({payload},{call,put}){
			const data = yield call(getVip.getMeterCardType);
			if (data[0] == 20000) {
				yield put({
					type: 'updateState',
					payload: {
						meterCardTypeList: data[2]
					}
				})
			} else {
				Toast.info(data[1], 0.8)
			}
		},
		*getCardCode({payload},{call,put}){
			//获取卡号列表
			const id = {
				Id:payload
			}
			const data = yield call(getVip.getCardCode,id);
			if(data[0]  == 20000 && data[2].length>0){
				yield put({
					type:'saveCardCode',
					payload:data[2][0]
				})
			}else {
				yield put({
					type:'saveCardCode',
					payload:data[2]
				})
				Toast.info('请先办会员卡', 0.8)
			}
		},
		*onUpdateCard({payload},{select,call,put}){
			//储值卡充值
			const {index,dataInfo} = payload;
			const vip = yield select(({vip}) => vip);

			if(index == 1){
				const info = {
					Id: vip.userId,
          			His_Card_Mid: vip.cardCodeId,
					...dataInfo
				}
				const data = yield call(getVip.updateCard,info);
				if(data[0] == 20000){
					Toast.info(data[1], 0.8)
					yield put(routerRedux.push({
						pathname:'/vipList'
					}))
				}else {
					Toast.info(data[1], 0.8)
				}
			}else{
				const info = {
					His_Consumer_Mid:vip.userId,//顾客id
					His_MeterCard_Mid:vip.cardCodeId,//卡id
					Sale_Employee_Mid:vip.sellId,//销售人员id
					Sale_Employee_Name:vip.sellName,//销售人员名字
					...dataInfo
				}
				const data = yield call(getVip.updateMeterCard,info);
				if(data[0] == 20000){
					Toast.info(data[1], 0.8)
					yield put(routerRedux.push({
						pathname:'/vipList'
					}))
				}else {
					Toast.info(data[1], 0.8)
				}
			}

		},
		*getEmployeeRole({payload},{call,put}){
			//获取销售人员列表
			const data = yield call(getVip.getEmployeeRole,{Sys_Role_Mid:1});
			if(data[0]  == 20000 || data[0] == 20001){
				yield put({
					type:'saveSellList',
					payload:data[2]
				})
			}else {
				Toast.info(data[1], 0.8)
			}
		},
		*addVip({payload},{select,call,put}){
			//新增会员
			const vip = yield select(({vip}) => vip);
			var info = {
				...payload,
				Petinfo:vip.dogInfoData
			}

			if(payload.Petname){
        info = {
          ...payload
        }
      }

			if(!info.Name){
				Toast.info('请输入会员姓名', 0.8)
				return false
			}
			if(!info.Mobile){
				Toast.info('请输入手机号码', 0.8)
				return false
			}
			for(let i=0;i<info.Petinfo.length;i++){
				if(!info.Petinfo[i].Petname){
					Toast.info('请输入宠物姓名', 0.8)
					return false
				}
			}
			const data = yield call(getVip.addVip,info);
			if(data[0]  == 20000){
				Toast.info(data[1], 0.8)
				yield put(routerRedux.push({
					pathname:'/vipList'
				}))
			}else {
				Toast.info(data[1], 0.8)
			}
		}
	},

	reducers: {
		updateState(state, {payload}){
			return {...state, ...payload}
		},
		changeSelectedSegmentIndex(state,action){
			return {...state,selectedSegmentIndex:action.payload}
		},
		changeSell(state,action){
			const {id,name} = action.payload;
			return {...state,sellName:name,sellId:id}
		},
		saveSellList(state,action){
			return {...state,sellList:action.payload}
		},
		saveVipName(state,action){
			return {...state,vipName:action.payload}
		},
		changDateName(state,action){
			return {...state,dateName:action.payload}
		},
		saveCardType(state,action){
			return {...state,cardTypeId:action.payload.id,cardTypeName:action.payload.name}
		},
		saveCardTypeList(state,action){
			return {...state,cardTypeList:action.payload}
		},
		saveCardCode(state,action){
			return {...state,cardCodeList:action.payload}
		},
		changeCardCode(state,action){
			const {code,id} = action.payload;
			return {...state,cardCodeName:code,cardCodeId:id}
		},
		saveUserId(state,action){
			//获取当前用户id
			return {...state,userId:action.payload}
		},
		getList(state, action) {
			//获取会员列表
			return { ...state, vipList: action.payload };
		},
		clearDogInfoData(state,action){
			//初始化宠物信息
			return {...state,dogInfoData:[],cardTypeName:'',dateName:''}
		},
		addDogInfoData(state, action) {
			//添加宠物信息
			state.dogInfoData.push({
				id: state.i++,
				PetSex: '公',//宠物性别
				Category: '1000000000000000',//宠物类型
				Sterilized:0,//绝育     0:正常  1:非正常
				Immunity:0,//免疫
				IsInsecticide:0,//驱虫
				Dead:0,//死亡
				Birthday: '',//宠物年龄
				Petname: '',//宠物姓名
				Discription:''//备注
			})
			return {
				...state,
				dogInfoData: state.dogInfoData
			}
		},
		removeDogInfo(state, action) {
			//删除宠物信息
			state.dogInfoData.splice(action.payload, 1);
			return {
				...state,
				dogInfoData: state.dogInfoData
			}
		},
		changeDogInfo(state, action) {
			//改变状态
			const { id, value } = action.payload;

			state.dogInfoData.map((data, index) => {
				if (data.id == id) {
					switch (value) {
						case 'gong'://宠物性别
							data.PetSex = '公'
							break;
						case 'mu':
							data.PetSex = '母'
							break;
						case 1://宠物种类
							data.Category = '1000000000000000'//猫
							break;
						case 2:
							data.Category = '1000000000000001'//狗
							break;
						case 3:
							data.Category = '1000000000000002'//其他
							break;
						case 4://宠物状态
							data.Sterilized = data.Sterilized == 0 ? 1 : 0;
							break;
						case 5:
							data.Immunity = data.Immunity == 0 ? 1 : 0;
							break;
						case 6:
							data.IsInsecticide = data.IsInsecticide == 0 ? 1: 0;
							break;
						case 7:
							data.Dead = data.Dead == 0 ? 1 : 0;
							break;
						default:
							break;
					}

				}
			})

			return {
				...state,
				dogInfoData: state.dogInfoData
			}
		},
		changeDate(state, action) {
			//宠物年龄
			const { id, value } = action.payload;

			state.dogInfoData.map((data, index) => {
				if (data.id == id) {
					data.Birthday = value
				}
			})

			return {
				...state,
				dogInfoData: state.dogInfoData
			}
		},
		changeDogName(state, action) {
			//宠物姓名
			const { id, value } = action.payload;
			state.dogInfoData.map((data, index) => {
				if (data.id == id) {
					data.Petname = value
				}
			})
			return {
				...state,
				dogInfoData: state.dogInfoData
			}
		},
		changeRemark(state,action){
			//备注
			const {id,value} = action.payload;
			state.dogInfoData.map((data, index) => {
				if (data.id == id) {
					data.Discription = value
				}
			})
			return {
				...state,
				dogInfoData: state.dogInfoData
			}
		},
		getVipStatus(state,action){
			return {...state,isVip:action.payload}
		}
	}

};
