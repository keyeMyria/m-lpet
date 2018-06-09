import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import EditTypeMain from '../../components/manage/editType';
import {ActivityIndicator} from 'antd-mobile'



const EditType = ({location,dispatch,manage,loading}) => {
    
    let {dataList,bigClassData} = manage;
    if(Object.keys(bigClassData).length == 0) {
        bigClassData = JSON.parse(sessionStorage.getItem('manageList_editType_bigClassData')) || {}
    }

    if(dataList instanceof Array && dataList.length == 0){
        dataList = JSON.parse(sessionStorage.getItem('manageList_editType_dataList')) || []
    }
    
    const editTypeProps = {
        dataList,
        bigClassData,
        onDel(id,status){
            dispatch({
                type:'manage/deleteCategory',
                payload:{id,status}
            })
        },
        onEditBigPress(id,name){
            dispatch({
                type:'manage/updateCategory',
                payload:{id,name}
            })
        }
    }
    
    const headerProps = {
        title:"编辑类别",
        // rightContent:<div>保存</div>,
        onLeftClick(){
            dispatch(routerRedux.push({
                pathname:'/manageList'
            }))
        },
        onAddVip(){
           
        }
       
    }

    return (
        <div>
            <ActivityIndicator
                toast
                text="正在加载"
                animating={!!loading.models.manage}
            />
            <Header {...headerProps}></Header>
            <EditTypeMain {...editTypeProps}></EditTypeMain>
        </div>
    )
}

EditType.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    manage:PropTypes.object
};

function mapStateToProps({manage,loading}){
    return {manage,loading}
}

export default connect(mapStateToProps)(EditType)
