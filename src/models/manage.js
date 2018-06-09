import * as getManage from '../services/manage';
import * as tallys from '../services/tally';
import {Toast} from 'antd-mobile';
import {routerRedux} from 'dva/router'

export default {

  namespace: 'manage',

  state: {
    manageList: [],//商品列表
    categoryList: [],//大类
    dataList: [],//类别数据
    typeId: '',//类别id
    typeName: '',//类别Name
    commodityName: '',//商品分类选择name
    commodityId: '',//商品分类选择id
    shopCategory: [],//商品分类
    serverClass: [],//服务分类
    bigClassData: {},//类别里的大类数据
    typeIndex: 0,//大类选择index
    moneyData: {},//商品列表统计数据
    totalPage: '',//总数量
    keyword: '',//搜索内容
    editData: {},//编辑内容
    pageIndex: 1,
    serviceCategory: [],
    companys:[],//供应商列表
    companyName:'',//供应商名称
    companyId:'',//供应商Id
    QRCode:'',
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        const {pathname, query} = location;
        if (pathname == "/manageList") {
          // dispatch({
          // 	type:'addPageIndex',
          // 	payload:1
          // })

          dispatch({
            type: 'updateState',
            payload: {
              pageIndex: 1
            }
          })


          dispatch({
            type:'saveKeyword',
            payload:''
          })
          dispatch({
            type: 'getManageList',
          })
         /* dispatch({
            type: 'getCommdityStock'
          })*/
          dispatch({
            type: 'getCompany'
          })
        } else if (pathname == "/manageList/manageType") {
          dispatch({
            type: 'getCategory'
          })
          dispatch({
            type: 'saveTypeIndex',
            payload: 0
          })
        } else if (pathname == "/manageList/editBigType") {

          dispatch({
            type: 'getCategory'
          })

        } else if (pathname == "/manageList/addManage") {
          dispatch({
            type: 'saveTypeIndex',
            payload: 0
          })
          dispatch({
            type: 'getCategory',
            payload: query
          })

          dispatch({
            type: 'saveQRCode',
            payload: ''
          })

        } 
      })
    }
  },

  effects: {
    * getManageList({payload = {}}, {select, call, put}) {
      //商品列表
      const pageIndex = yield select(({manage}) => manage.pageIndex);
      const keyword = yield select(({manage}) => manage.keyword);
      const info = {
        pageIndex: pageIndex,
        keyword: keyword ? keyword : payload.keyword
      }

      const data = yield call(getManage.getManageList, info);
      const manageList = yield select(({manage}) => manage.manageList);
      const moneyData = yield select(({manage}) => manage.moneyData);
      if (data[0] == 20000) {
        if (manageList.length > 0 && pageIndex > 1) {
          const addData = manageList.concat(data[2].result)
          var money =Number(data[2].money) ;
          var stock =Number(data[2].stock);

          const moneyDataNew = {money: money, stock: stock}

          yield put({
            type: 'saveMoneyData',
            payload: moneyDataNew
          })

          yield put({
            type: 'saveManageList',
            payload: addData
          })
          yield put({
            type: 'addPageIndex',
            payload: pageIndex + 1
          })
          yield put({
            type: 'saveTotalPage',
            payload: data[2].page.totalPage
          })
          payload.resolve ? payload.resolve() : ''

        } else {

          yield put({
            type: 'addPageIndex',
            payload: pageIndex + 1
          })
          yield put({
            type: 'saveMoneyData',
            payload: {money: data[2].money, stock: data[2].stock}
          })
          yield put({
            type: 'saveManageList',
            payload: data[2].result
          })
          yield put({
            type: 'saveTotalPage',
            payload: data[2].page.totalPage
          })
          document.getElementsByClassName('tloader')[0].scrollTop = 0;
        }
      } else if (data[0] == 20001) {
        if(pageIndex>1){
          yield put({
            type: 'saveMoneyData',
            payload: moneyData
          })
          yield put({
            type: 'saveManageList',
            payload: manageList
          })

          yield put({
            type: 'saveTotalPage',
            payload: 0
          })
          Toast.info('暂无更多数据!', 0.8)
        } else {
          yield put({
            type: 'saveMoneyData',
            payload: {money: 0, stock: 0}
          })

          yield put({
            type: 'saveManageList',
            payload: []
          })

          yield put({
            type: 'saveTotalPage',
            payload: 0
          })
          Toast.info('暂无数据!', 0.8)
        }
      }

    },
    * getCategory({payload}, {select, call, put}) {
      //获取大类
      const data = yield call(getManage.getCategory);
      const typeIndex = yield select(({manage}) => manage.typeIndex);
      if (data[0] == 20000) {
        yield put({
          type: 'saveCategoryList',
          payload: data[2]
        })

        var id = '';
        var name = '';
        if(payload){
          id = payload.Id;
          name = payload.Name;
        }
        if (!id) {
          id = data[2][typeIndex].Id;
          name = data[2][typeIndex].Name;
        }
        yield put({
          type: 'getCommodityBySbucategory',
          payload: {id: id, index: typeIndex,name:name}
        })
        yield put({
          type: 'saveTypeId',
          payload: data[2][0].Id
        })
        yield put({
          type: 'saveTypeName',
          payload: data[2][0].Name
        })
      } else {
        Toast.info(data[1], 0.8)
      }
    },
    * getCommodityBySbucategory({payload}, {select, call, put}) {
      //获取类别
      const {id, index} = payload;
      const data = yield call(getManage.getCommodityBySbucategory, {Id: id});
      const categoryList = yield select(({manage}) => manage.categoryList);
      yield put({
        type: 'saveTypeIndex',
        payload: index
      })
      yield put({
        type: 'saveBigClass',
        payload: categoryList[index]
      })
      yield put({
        type: 'saveTypeId',
        payload: payload.id
      })
      yield put({
        type: 'saveTypeName',
        payload: payload.name
      })
      if (data[0] == 20000) {
        yield put({
          type: 'saveDataList',
          payload: data[2]
        })
      } else {
        yield put({
          type: 'saveDataList',
          payload: data[2]
        })
      }
    },
    * addCategory({payload}, {call, put}) {

      //新增大类
      if (payload.id) {
        const info = {
          Name: payload.name,
          Id: payload.id,
          ServiceType:payload.ServiceType
        }
        const data = yield call(getManage.addCategoryNew, info);
        if (data[0] == 20000) {
          yield put({
            type: 'getCategory'
          })
          Toast.info(data[1], 0.8)
        } else {
          Toast.info(data[1], 0.8)
        }
      } else {
        const info = {
          Name: payload.name
        }
        const data = yield call(getManage.addCategory, info);
        if (data[0] == 20000) {
          yield put({
            type: 'getCategory'
          })
          Toast.info(data[1], 0.8)
        } else {
          Toast.info(data[1], 0.8)
        }
      }


    },
    * deleteCategory({payload}, {call, put}) {
      //删除类别
      const data = yield call(getManage.deleteCategory, {Id: payload.id});
      if (data[0] == 20000) {
        yield put({
          type: 'getCategory'
        })
        if (payload.status == 'true') {
          yield put(routerRedux.push({
            pathname: '/manageList/manageType'
          }))
        }

      } else {
        Toast.info(data[1], 0.8)
      }
    },
    * updateCategory({payload}, {call, put}) {
      //更新类名
      const info = {
        Id: payload.id,
        Name: payload.name
      }
      const data = yield call(getManage.CategoryUpdate, info);
      if (data[0] == 20000) {
        yield put({
          type: 'getCategory'
        })
      } else {
        Toast.info(data[1], 0.8)
      }
    },
    * getCommodityClass({payload}, {call, put}) {
      //获取商品分类
      const data = yield call(getManage.getCategoryForCommodity);
      if (data[0] == 20000) {
        yield put({
          type: 'saveCommodityClass',
          payload: {
            shopCategory: data[2].shopCategory.children,
            serviceCategory: data[2].serviceCategory
          }
        })
      } else {
        Toast.info(data[1], 0.8)
      }
    },
    * addCommodity({payload}, {select, call, put}) {
      //添加商品
      const manage = yield select(({manage}) => manage);
      const editData = yield select(({manage}) => manage.editData);
      const resultCode = yield call(getManage.getCommodityCode);
      var code = new Date().getTime();
      if (resultCode[0] == 20000) {
        code = resultCode[2];
      }

      let info = {}
      if (editData.Id) {
        info = {
          Id: editData.Id,
          ...payload.value,
          Con_Category_Mid: manage.commodityId
        }
      } else {
        info = {
          ...payload.value,
          IsStock: '1',
          Code: code,
          Con_Category_Mid: manage.commodityId
        }
      }

      if (!info.Name) {
        Toast.info('请输入商品名称', 0.8)
        return false
      } else if (!info.Con_Category_Mid) {
        Toast.info('请选择商品分类', 0.8)
        return false
      }


      if (payload.files) {
        const files = yield call(getManage.uploadImg, payload.files);
        if (files[0] == 20000) {
          const img = files[2];
          const newInfo = {
            ...info,
            CommodityImg: img
          }
          const data = yield call(editData.Id ? getManage.commodityUpdate : getManage.addCommodity, newInfo);
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
        const data = yield call(editData.Id ? getManage.commodityUpdate : getManage.addCommodity, info);
        if (data[0] == 20000) {
          yield put(routerRedux.goBack())
          Toast.info(data[1], 0.8)
        } else {
          Toast.info(data[1], 0.8)
        }
      }


    },
    * getCommdityStock({payload}, {call, put}) {
      //获取商品库存和总价
      const data = yield call(getManage.getCommdityStock);
      if (data[0] == 20000) {
        yield put({
          type: 'saveMoneyData',
          payload: {money: data[2].money, stock: data[2].stock}
        })
      } else {
        Toast.info(data[1], 0.8)
      }
    },
    * deleteCommodity({payload}, {call, put}) {
      const data = yield call(getManage.deleteCommodity, {Ids: payload})
      if (data[0] == 20000) {
        Toast.info('删除成功', 0.8)
        yield put(routerRedux.goBack())
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
  },

  reducers: {
    saveQRCode(state,{payload}){
      return {...state,QRCode:payload}
    },
    saveTotalPage(state, action) {
      return {...state, totalPage: action.payload}
    },
    saveMoneyData(state, action) {
      const {money, stock} = action.payload;
      return {...state, moneyData: {money, stock}}
    },
    saveCompany(state, action) {
      return {...state, companys: action.payload}
    },
    clearCommodity(state, action) {
      return {...state, commodityName: '', commodityId: ''}
    },
    changeCommodityName(state, action) {
      const {id, name} = action.payload;
      return {...state, commodityName: name, commodityId: id}
    },
    changeComName(state, action) {
      const {id, name,companys} = action.payload;
      return {...state, companyName: name, companyId: id,companyArrs:companys}
    },
    saveTypeIndex(state, action) {
      return {...state, typeIndex: action.payload}
    },
    saveBigClass(state, action) {
      return {...state, bigClassData: action.payload}
    },
    saveCommodityClass(state, action) {
      const {shopCategory, serviceCategory} = action.payload;
      return {...state, shopCategory, serviceCategory}
    },
    saveTypeId(state, action) {
      return {...state, typeId: action.payload}
    },
    saveTypeName(state, action) {
      return {...state, typeName: action.payload}
    },
    saveManageList(state, action) {
      return {...state, manageList: action.payload}
    },
    saveCategoryList(state, action) {
      return {...state, categoryList: action.payload}
    },
    saveDataList(state, action) {
      return {...state, dataList: action.payload}
    },
    saveKeyword(state, action) {
      return {...state, keyword: action.payload}
    },
    saveEditData(state, action) {
      return {...state, editData: action.payload}
    },
    addPageIndex(state, action) {
      return {...state, pageIndex: action.payload}
    },
    updateState(state, {payload}) {
      return {...state, ...payload}
    }
  }

};
