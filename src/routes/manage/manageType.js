import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import ManageTypeMain from '../../components/manage/manageType';
import {ActivityIndicator} from 'antd-mobile'


const ManageType = ({location,dispatch,manage,loading}) => {

    const {categoryList,dataList,typeId,typeName,typeIndex,bigClassData} = manage;

    const manageTypeProps = {
        categoryList,
        dataList,
        typeIndex,
        onEditBigType(){
            dispatch(routerRedux.push({
                pathname:'/manageList/editBigType'
            }))
        },
        onEditType(){
            sessionStorage.setItem('manageList_editType_dataList', JSON.stringify(dataList))
            sessionStorage.setItem('manageList_editType_bigClassData', JSON.stringify(bigClassData))
            dispatch(routerRedux.push({
                pathname:'/manageList/editType'
            }))
        },
        getDataList(id,index,name){
            dispatch({
                type:'manage/getCommodityBySbucategory',
                payload:{id,index,name}
            })
        },
        addCategory(value){
            dispatch({
                type:'manage/addCategory',
                payload:{
                    name:value
                }
            })
        },
        addTypeData(value){
          debugger
          var ServiceType = 0;
          if(typeName){
               if(typeName.indexOf('美容')>-1){
                 ServiceType = 1;
               }
           }
            dispatch({
                type:'manage/addCategory',
                payload:{
                    id:typeId,
                    name:value,
                    ServiceType
                }
            })
        }
    }

    const headerProps = {
        title:"商品分类",
        onLeftClick(){
            dispatch(routerRedux.goBack())
        }

    }

    return (
        <div>
            <ActivityIndicator
                toast
                text="正在加载"
                animating={loading.models.manage}
            />
            <Header {...headerProps}></Header>
            <ManageTypeMain {...manageTypeProps}></ManageTypeMain>
        </div>
    )
}

ManageType.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    manage:PropTypes.object
};

function mapStateToProps({manage,loading}){
    return {manage,loading}
}

export default connect(mapStateToProps)(ManageType)
