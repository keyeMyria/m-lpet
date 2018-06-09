import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import EditBigTypeMain from '../../components/manage/editBigType';
import {ActivityIndicator} from 'antd-mobile'


const EditBigType = ({location,dispatch,manage,loading}) => {

    const {categoryList} = manage;

    const editBigTypeProps = {
        categoryList,
        onDelType(id){
            dispatch({
                type:'manage/deleteCategory',
                payload:{
                  id
                }
            })
        },
        onUpdateType(id,name){
            dispatch({
                type:'manage/updateCategory',
                payload:{id,name}
            })
        }
    }

    const headerProps = {
        title:"编辑大类",
        // rightContent:<div>保存</div>,
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
        onAddVip(){

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
            <EditBigTypeMain {...editBigTypeProps}></EditBigTypeMain>
        </div>
    )
}

EditBigType.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    manage:PropTypes.object
};

function mapStateToProps({manage,loading}){
    return {manage,loading}
}

export default connect(mapStateToProps)(EditBigType)
