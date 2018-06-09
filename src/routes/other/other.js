import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import OtherMain from '../../components/other/other';
import {ActivityIndicator} from 'antd-mobile'


const Other = ({location,dispatch,other,loading}) => {
    
    const {otherList,otherData, queryFilter} = other;

    const otherMainProps = {
        otherList,
        otherData,
        queryFilter,
        onEndTime(data){
            dispatch({
                type:'other/getList',
                payload:data
            })
        }
    }
    const headerProps = {
        title:"其它收支",
        rightContent:<div><img src={require('../../assets/add.png')} alt=""/>新增收支</div>,
        onLeftClick(){
            dispatch(routerRedux.push({
                pathname:'/'
            }))
        },
        onAddVip(){
            dispatch(routerRedux.push({
                pathname:'/other/addBill'
            }))
        }
    }


    return (
        <div>
            <ActivityIndicator
                toast
                text="正在加载"
                animating={loading.models.other}
            />
            <Header {...headerProps}></Header>
            <OtherMain {...otherMainProps}></OtherMain>
        </div>
    )
}

Other.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    other:PropTypes.object
};

function mapStateToProps({other,loading}){
    return {other,loading}
}

export default connect(mapStateToProps)(Other)
