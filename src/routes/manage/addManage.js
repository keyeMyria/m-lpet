import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import AddManageListMain from '../../components/manage/addManage';
import {ActivityIndicator,Modal} from 'antd-mobile'
const alert = Modal.alert


const AddManage = ({location,dispatch,manage,loading}) => {

    const {commodityId,commodityName,shopCategory,serviceCategory,editData,categoryList,dataList,companys,QRCode} = manage;

    const addManageListProps = {
        categoryList,
        commodityName,
        shopCategory,
        serviceCategory,
        editData,
        dataList,
        companys,
        QRCode,
        onSubmit(value,files){
          value.Con_Category_Mid = commodityId;
          //value.Code = new Date().getTime();
            dispatch({
                type:'manage/addCommodity',
                payload:{
                    value,
                    files
                }
            })
        },
        submitCard(id,name){
            dispatch({
                type:'manage/changeCommodityName',
                payload:{id,name}
            })
        },
        submitComCard(id,name){
          dispatch({
            type:'manage/changeComName',
            payload:{id,name}
          })
        },
        clearCommodity(){
            dispatch({
                type:'manage/clearCommodity'
            })
        },
        getTypeClass(id,index,name){
            dispatch({
                type:'manage/getCommodityBySbucategory',
                payload:{id,index,name}
            })
        },
        saveQRCode(value){
            dispatch({
                type:'manage/saveQRCode',
                payload:value
            })
        }
    }

    const headerProps = {
        title:editData.Id ? "编辑商品" : "新增商品",
        rightContent:editData.Id ? <div>删除</div> : '',
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
        onAddVip(){
            alert('确认删除商品','',[{text:'取消'},{text:'确认',onPress:() => {
                dispatch({
                    type:"manage/deleteCommodity",
                    payload:editData.Id
                })
            }}])

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
            <AddManageListMain {...addManageListProps}></AddManageListMain>
        </div>
    )
}

AddManage.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    manage:PropTypes.object
};

function mapStateToProps({manage,loading}){
    return {manage,loading}
}

export default connect(mapStateToProps)(AddManage)
