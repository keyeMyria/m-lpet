import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import VipRefillMain from '../../components/vip/vipRefill';
import {ActivityIndicator} from 'antd-mobile'


const VipRefill = ({location,dispatch,vip,loading}) => {
    
    const {cardCodeList,cardCodeName,vipName,sellList,sellName,cardCodeId} = vip;

    const vipRefillProps = {
        cardCodeId,
        cardCodeList,
        cardCodeName,
        vipName,
        sellList,
        sellName,
        clearCardCodeName(){
            dispatch({
                type:'vip/changeCardCode',
                payload:{}
            })
        },
        onChangeCardCode(id,code){
            dispatch({
                type:'vip/changeCardCode',
                payload:{id,code}
            })
        },
        onUpdateCard(index,data){
            dispatch({
                type:'vip/onUpdateCard',
                payload:{index,dataInfo:data}
            })
        },
        onSellName(id,name){
            dispatch({
                type:'vip/changeSell',
                payload:{id,name}
            })
        }
    }
    
    const headerProps = {
        title:"会员充值",
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
        
    }

    return (
        <div>
            <ActivityIndicator
                toast
                text="正在加载"
                animating={loading.models.vip}
            />
            <Header {...headerProps}></Header>
            <VipRefillMain {...vipRefillProps}></VipRefillMain>
        </div>
    )
}

VipRefill.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    vip:PropTypes.object
};

function mapStateToProps({vip,loading}){
    return {vip,loading}
}

export default connect(mapStateToProps)(VipRefill)
