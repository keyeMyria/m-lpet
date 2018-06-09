import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import VipCardMain from '../../components/vip/vipCard.js';

const VipCard = ({location,dispatch,vip}) => {
    
    const {cardTypeList,cardTypeName,dateName, meterCardTypeList} = vip;

    const vipCardProps = {
        cardTypeList,
        meterCardTypeList,
        cardTypeName,
        dateName,
        onAddVipCard(cardTypeIndex,value){
            dispatch({
                type:'vip/addVipCard',
                payload:{cardTypeIndex,dataInfo:value}
            })
        },
        submitCard(id,name){
            dispatch({
                type:'vip/saveCardType',
                payload:{id,name}
            })
        },
        changDateName(value){
            dispatch({
                type:'vip/changDateName',
                payload:value
            })
        }
    }
    
    const headerProps = {
        title:"会员办卡",
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
    }

    return (
        <div>
            <Header {...headerProps}></Header>
            <VipCardMain {...vipCardProps}></VipCardMain>
        </div>
    )
}

VipCard.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    vip:PropTypes.object
};

function mapStateToProps({vip}){
    return {vip}
}

export default connect(mapStateToProps)(VipCard)
