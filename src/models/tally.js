import * as tallys from '../services/tally';
import * as getManage from '../services/manage';
import {Toast} from 'antd-mobile';
import Cookie from 'js-cookie';
import {routerRedux} from 'dva/router'

const toNumber = (numberStr, defaultValue) => {
  if(!defaultValue){
      defaultValue = 0
  }

  const number = Number(numberStr)
  return isNaN(number) ? defaultValue : number
}

export default {

  namespace: 'tally',

  state: {
    typeList: [],//分类列表
    dataList: [],//商品列表
    searchData: [],//搜索数据
    typeIndex: 0,
    manageList: [],//商品数据列表
    catNum: 0,//商品总数量
    catTotal: 0,//商品总价格
    orderList: [],//订单列表
    sellList: [],//销售人员
    typeActive: true,//客户类型
    keyword: '',//搜索
    vipList: [],//会员卡列表
    billId: '',//后台返回订单id
    vipInitData: {},//vip卡初始化数据
    vipData: {},//vip传过来的数据
    totalPage: '',//总数量
    vipCardData: {},//卡的选择数据
    vipDogData: {},//宠物选择数据
    leftData: {},//左边数据存储
    commoditysClass: [],//商品分类
    commodityName: {},//商品分类选中数据
    companys:[],
    CardOffList: [], //商品会员卡折扣设置
    orderData: undefined,
    QRCode:'',//扫描条码
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        const {pathname, query} = location;

        if (pathname == "/tally") {
          dispatch({
            type: 'getType'
          })
          dispatch({
            type: 'getIniCat'
          })
          dispatch({
            type: 'getCartData'
          })
        } else if (pathname == "/tally/goodsList") {
          dispatch({
            type: 'getType'
          })

          dispatch({
            type: 'getCompany'
          })

        } else if (pathname == "/tally/affirmOrder") {
          dispatch({
            type: 'getEmployeeRole'
          })

          if (query) {
            dispatch({
              type: 'saveVipData',
              payload: query.vipData
            })
            if(query.vipData && query.vipData.Id){
              dispatch({
                type: 'queryVipOffSetList',
                payload: {
                  His_Consumer_Mid: query.vipData.Id
                }
              })
            }
          } else {
            dispatch({
              type: 'changeType',
              payload: 3
            })
          }
        } else if (pathname == "/tally/paytype") {
          dispatch({
            type: 'getVipCartData'
          })
        } else if (pathname == '/tally/addCommodity') {
          dispatch({
            type: 'getCategory'
          })
          dispatch({
            type: 'saveCommodityName',
            payload: {}
          })
          dispatch({
            type: 'getCompany'
          })
          dispatch({
            type: 'saveQRCode',
            payload: ''
          })
          
        }else if(pathname == '/tally/searchCode'){
          dispatch({
            type:'onCancel'
          })
        }
      })


    }
  },

  effects: {
    * getType({payload}, {select, call, put}) {
      //获取商品分类
      const data = yield call(tallys.getType);
      const typeIndex = yield select(({tally}) => tally.typeIndex)
      if (data[0] == 20000) {
        yield put({
          type: 'getTypeList',
          payload: data[2]
        })
        yield put({
          type: 'getData',
          payload: {id: data[2][typeIndex].Id, index: typeIndex, name: data[2][typeIndex].Name}
        })

      } else {
        Toast.info(data[1], 0.8)
      }
    },
    * getData({payload}, {call, put, select}) {
      //获取商品列表
      const {id, index, name} = payload;
      const data = yield call(tallys.getData, {Con_Category_Mid: id});
      yield put({
        type: 'saveIndex',
        payload: {index, id, name}
      })
      if (data[0] == 20000 || data[0] == 20001) {
        yield put({
          type: 'getDataList',
          payload: data[2]
        })
      } else {
        yield put({
          type: 'getDataList',
          payload: data[2]
        })
        Toast.info(data[1], 0.8)
      }
    },
    * addcart_affirmOrder({payload}, {select, call, put}) {
      //添加商品
      const data = yield call(tallys.addcart, payload);
      const keyword = yield select(({tally}) => tally.keyword)
      if (data[0] == 20000) {
        yield put({
          type: 'saveTotal',
          payload: {
            catNum: data[2].catNum,
          }
        })
      } else {
        Toast.info(data[1], 0.8)
      }
    },
    * addcart({payload}, {select, call, put}) {
      //添加商品
      const data = yield call(tallys.addcart, payload);
      const keyword = yield select(({tally}) => tally.keyword)
      if (data[0] == 20000) {
        yield put({
          type: 'getType',
        })
        yield put({
          type: 'getCartData'
        })
        yield put({
          type: 'saveTotal',
          payload: {
            catNum: data[2].catNum,
            catTotal: data[2].catTotal
          }
        })
        yield put({
          type: 'searchData',
          payload: keyword
        })
      } else {
        Toast.info(data[1], 0.8)
      }
    },
    * searchData({payload}, {call, put}) {
      //搜索商品
      const data = yield call(tallys.searchData, {keyword: payload});
      if (data[0] == 20000 || data[0] == 20001) {
        yield put({
          type: 'getSearchData',
          payload: data[2].result
        })
      } else {
        yield put({
          type: 'getSearchData',
          payload: data[2]
        })
        Toast.info(data[1], 0.8)
      }
    },
    * getManageList({payload = {}}, {select, call, put}) {
      //商品列表
      const leftData = yield select(({tally}) => tally.leftData);
      const info = {
        pageIndex: payload.pageIndex ? payload.pageIndex : 1,
        keyword: leftData.name
      }

      const data = yield call(tallys.getManageList, info);
      const manageList = yield select(({tally}) => tally.manageList);
      if (data[0] == 20000) {
        if (manageList.length > 0 && payload.pageIndex > 1) {
          const addData = manageList.concat(data[2].result)
          yield put({
            type: 'saveManageList',
            payload: addData
          })
          payload.resolve()

        } else {
          yield put({
            type: 'saveManageList',
            payload: data[2].result
          })
          yield put({
            type: 'saveTotalPage',
            payload: data[2].page.totalPage
          })
        }
      } else if (data[0] == 20001) {
        yield put({
          type: 'saveManageList',
          payload: manageList
        })

        yield put({
          type: 'saveTotalPage',
          payload: 0
        })
        Toast.info(data[1], 0.8)
      }

    },
    * getCartData({payload}, {call, put, select}) {
      //获取订单列表
      const data = yield call(tallys.getCartData);
      const sellList = yield select(({tally}) => tally.sellList)
      if (data[0] == 20000) {
        
        const newData = data[2].result.map((data, index) => {
          let info = {
            ...data
          }

          if (sellList.length > 0) {
            info.Sale_Con_Employee_Name = sellList[0].Name,
            info.Sale_Con_Employee_Mid = sellList[0].Id
          }

          return info
        })
        yield put({
          type: 'saveOrderList',
          payload: newData
        })


        yield put({
          type: 'saveTotal',
          payload: {
            catNum: data[2].count.catNum,
            catTotal: data[2].count.catTotal
          }
        })
      } else {
        yield put({
          type: 'saveOrderList',
          payload: data[2]
        })
        yield put({
          type: 'saveTotal',
          payload: {
            catNum: 0,
            catTotal: 0
          }
        })
        Toast.info('你好,你当前没有添加任何收银账单记录,请添加!', 1)
      }
    },
    * getIniCat({payload}, {call, put}) {
      //获取初始化订单数量
      const data = yield call(tallys.getIniCat);
      if (data[0] == 20000) {
        yield put({
          type: 'updateState',
          payload: {
            vipData: {},
            vipInitData: {},
            catNum: data[2].catNum,
            catTotal: data[2].catTotal
          }
        })
      } else {
        Toast.info(data[1], 0.8)
      }
    },
    * getEmployeeRole({payload}, {call, put}) {
      //获取销售人员列表
      const data = yield call(tallys.getEmployeeRole);
      if (data[0] == 20000) {
        yield put({
          type: 'saveSellList',
          payload: data[2]
        })
        yield put({
          type: 'getCartData'
        })
      } else if(data[0] != 20001) {
        Toast.info(data[1], 0.8)
      }
    },
    * changeSellName({payload}, {select, call, put}) {
      //修改销售人员
      const {id, name, parentId} = payload;
      const orderList = yield select(({tally}) => tally.orderList)
      orderList.map((data, index) => {
        if (data.Id == parentId) {
          data.Sale_Con_Employee_Name = name,
            data.Sale_Con_Employee_Mid = id
          return data
        }
      })
      yield put({
        type: 'saveOrderList',
        payload: orderList
      })
    },
    * recordBill({payload}, {select, call, put}) {
      //提交订单
      const { orderList, orderData } = yield select(({tally}) => tally)
      const typeActive = yield select(({tally}) => tally.typeActive)
      const catTotal = yield select(({tally}) => tally.catTotal)
      const vipData = yield select(({tally}) => tally.vipData)
      const vipCardData = yield select(({tally}) => tally.vipCardData)
      const vipDogData = yield select(({tally}) => tally.vipDogData)

      var newOrderList = [];
      if (orderList.length > 0) {
        let data = orderData || orderList
        data.forEach(item => {
          var info = {
            Quantity: item.addNumber,
            His_Commodity_Mid: item.Id,
            Con_Commodity_Mid: item.Id,
            Price: item.salePrice,
            Off: item.Off,
            PayPrice: item.salePrice * item.addNumber,
            Sale_Con_Employee_Mid: item.Sale_Con_Employee_Mid,
            Sale_Con_Employee_Name: item.Sale_Con_Employee_Name,
            Service_Con_Employee_Mid: item.Service_Con_Employee_Mid,
            Service_Con_Employee_Name: item.Service_Con_Employee_Name
          }
          newOrderList.push(info)
        })
      }

      let info = {
        commoditys: newOrderList,
        catTotal,
        offTotal: catTotal,
      }

      if (typeActive == 2) {
        info = {
          ...info,
          His_Consumer_Mid: vipData.Id,
          His_Pet_Mid: vipDogData.Id,
          ConsumerName:  vipData.Name,
          PetName:  vipDogData.Name,
          Mobile: vipData.Mobile,
        }
        const data = yield call(tallys.recordBill, info);
        if (data[0] == 20000) {
          yield put({
            type: 'saveBillId',
            payload: data[2].His_Bill_Mid
          })
          yield put(routerRedux.push({
            pathname: '/tally/paytype'
          }))
        } else {
          Toast.info(data[1], 0.8)
        }
      } else if (typeActive == 3) {
        info = {
          ...info,
          ConsumerName: '散客', 
          PetName:  '散客',
        } 
        const data = yield call(tallys.recordBill, info);
        if (data[0] == 20000) {
          yield put({
            type: 'saveBillId',
            payload: data[2].His_Bill_Mid
          })
          yield put(routerRedux.push({
            pathname: '/tally/paytype'
          }))
        } else {
          Toast.info(data[1], 0.8)
        }
      }
    },
    * onSubmit({payload}, {select, call, put}) {
      //完成支付
      const billId = yield select(({tally}) => tally.billId)
      const {orderList, orderData} = yield select(({tally}) => tally)
      var newOrderList = [];
      var catTotal = 0;
      if (orderList.length > 0) {
        const data = orderData || orderList
        data.forEach(item => {
          var info = {
            Quantity: item.addNumber,
            His_Commodity_Mid: item.Id,
            Price: item.salePrice,
            Off:  (10.0 * toNumber(item.discount) / toNumber(item.SalePrice, 1)).toFixed(4),//item.Off,
            PayPrice: item.discount,
            // Off: item.Off,
            // PayPrice: item.salePrice * item.addNumber,
            Sale_Con_Employee_Mid: item.Sale_Con_Employee_Mid,
            Sale_Con_Employee_Name: item.Sale_Con_Employee_Name,
            Service_Con_Employee_Mid: item.Service_Con_Employee_Mid,
            Service_Con_Employee_Name: item.Service_Con_Employee_Name
          }
          newOrderList.push(info)
          catTotal += item.salePrice * item.addNumber;
        })
      }
      const info = {
        ...payload,
        His_Bill_Mid: billId,
        commoditys: newOrderList,
        catTotal: catTotal,
        Discount: (catTotal - payload.PayTotal).toFixed(2)
      }

      const cleanCat = yield call(tallys.cleanCat);
      if(cleanCat[0] == 20000){
        const data = yield call(tallys.payment, info);
        if (data[0] == 20000 ) {
          yield put({
            type: 'updateState',
            payload: {
              catTotal: info.PayTotal
            }
          })

          yield put(routerRedux.push({
            pathname: '/tally/orderSucceed'
          }))

        } else {
          Toast.info(data[1], 0.8)
        }
      }else {
        Toast.info(cleanCat[1], 0.8)
      }
      yield put({type: 'update', orderData: undefined})
    },
    * getVipCartData({payload}, {select, call, put}) {
      //获取会员卡列表
      const vipData = yield select(({tally}) => tally.vipData)
      if (vipData.Id) {
        const data = yield call(tallys.cardList, {His_Consumer_Mid: vipData.Id});
        data[2].DepositMoney = vipData.DepositMoney;
        data[2].His_Consumer_Mid = vipData.Id
        if (data[0] == 20000) {
          yield put({
            type: 'saveVipList',
            payload: data[2]
          })

        } else {
          yield put({
            type: 'saveVipList',
            payload: []
          })
          //Toast.info('所选用户没有会员卡!')
        }
      }

    },
    * getCategory({payload}, {select, call, put}) {
      //获取下面的分类
      const leftData = yield select(({tally}) => tally.leftData)
      const data = yield call(tallys.getCategory, {Id: leftData.id})
      if (data[0] == 20000 || data[0] == 20001) {
        yield put({
          type: 'saveCommoditysClass',
          payload: data[2]
        })

      } else {
        Toast.info(data[1], 0.8)
      }
    },
    * addCommodity({payload}, {select, call, put}) {
      //添加商品
      const commodityName = yield select(({tally}) => tally.commodityName);

      const resultCode = yield call(getManage.getCommodityCode);
      var code = new Date().getTime();
      if (resultCode[0] == 20000) {
        code = resultCode[2];
      }


      const info = {
        ...payload.value,
        Code: code,
        Con_Category_Mid: commodityName.id
      }

      if (!info.Name) {
        Toast.info('请输入商品名称', 0.8)
        return false
      } else if (!info.Con_Category_Mid) {
        Toast.info('请选择商品分类', 0.8)
        return false
      }


      if (payload.files) {
        const files = yield call(tallys.uploadImg, payload.files);
        if (files[0] == 20000) {
          const img = files[2];
          const newInfo = {
            ...info,
            CommodityImg: img
          }
          const data = yield call(tallys.addCommodity, newInfo);
          if (data[0] == 20000) {
            yield put(routerRedux.goBack())
            Toast.info(data[1], 0.8)
          } else {
            Toast.info(data[1], 0.8)
          }
        } else {
          Toast.info(data[1], 0.8)
        }
      } else {
        const data = yield call(tallys.addCommodity, info);
        if (data[0] == 20000) {
          yield put(routerRedux.goBack())
          Toast.info(data[1], 0.8)
        } else {
          Toast.info(data[1], 0.8)
        }
      }


    },
    *getCompany({payload}, {select, call, put}) {
      const data = yield call(tallys.getCompany)
      if (data[0] == 20000 || data[0] == 20001) {
        yield put({
          type: 'saveCompany',
          payload: data[2]
        })

      } else {
        Toast.info(data[1], 0.8)
      }
    },
    *queryVipOffSetList({payload}, {select, call, put}){
      const orderList = yield select(({tally}) => tally.orderList);
      let commodityIds 
      if(orderList instanceof Array){
        commodityIds = orderList.map(item => item.Id)
      }else{
        return
      }

      const result = yield call(tallys.queryVipOffSetList, {...payload, commodityIds})
      if(result[0] == 20000 || result[0] == 20001){
        yield put({
          type: 'updateState',
          payload: {
            CardOffList: result[2].CardOffList
          }
        })
      }else{
        Toast.info(data[1], 0.8)
      }
    }
  },

  reducers: {
    saveQRCode(state,{payload}){
      return {...state,QRCode:payload}
    },
    updateState(state, {payload}){
      return {...state, ...payload}
    },
    saveCommodityName(state, action) {
      const {id, name} = action.payload;
      return {...state, commodityName: {id, name}}
    },
    saveCommoditysClass(state, action) {
      return {...state, commoditysClass: action.payload}
    },
    saveCompany(state, action) {
      return {...state, companys: action.payload}
    },
    changeComName(state, action) {
      const {id, name,companys} = action.payload;
      return {...state, companyName: name, companyId: id,companyArrs:companys}
    },
    saveTotalPage(state, action) {
      return {...state, totalPage: action.payload}
    },
    saveIndex(state, action) {
      const {id, index, name} = action.payload;
      return {...state, typeIndex: index, leftData: {id, name}}
    },
    getTypeList(state, action) {
      return {...state, typeList: action.payload};
    },
    getDataList(state, action) {
      return {...state, dataList: action.payload}
    },
    getSearchData(state, action) {
      return {...state, searchData: action.payload}
    },
    saveManageList(state, action) {
      return {...state, manageList: action.payload}
    },
    saveTotal(state, action) {
      return {...state, ...action.payload}
    },
    saveOrderList(state, action) {
      return {...state, orderList: action.payload}
    },
    saveSellList(state, action) {
      return {...state, sellList: action.payload}
    },
    changeType(state, action) {
      return {...state, typeActive: action.payload}
    },
    saveKeyword(state, action) {
      return {...state, keyword: action.payload}
    },
    onCancel(state, action) {
      return {...state, searchData: [], keyword: ''}
    },
    saveVipList(state, action) {
      return {...state, vipList: action.payload, vipInitData: action.payload[0]?action.payload[0]:{}}
    },
    saveBillId(state, action) {
      return {...state, billId: action.payload}
    },
    changeVipName(state, action) {
      const newData = state.vipList[action.payload]
      return {...state, vipInitData: newData}
    },
    saveVipData(state, action) {
      const vipCardData = action.payload.consumerCardInfo.length > 0 ? action.payload.consumerCardInfo[0] : {};
      const vipDogData = action.payload.consumerPetInfo.length > 0 ? action.payload.consumerPetInfo[0] : {};
      return {...state, vipData: action.payload, typeActive: 2, vipCardData, vipDogData}
    },
    changeCard(state, action) {
      return {...state, vipCardData: action.payload}
    },
    changDog(state, action) {
      return {...state, vipDogData: action.payload}
    }
  }

};
