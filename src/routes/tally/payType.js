import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import PayMain from '../../components/tally/payType';

const PayType = ({location,dispatch,tally}) => {

    const {catNum,catTotal,typeActive,vipList,vipInitData, orderData,CardOffList} = tally;
    const orderMainProps = {
        typeActive,
        catNum,
        catTotal,
        vipList,
        vipInitData,
        orderList: orderData,
        CardOffList,
        onSubmit(data){
            dispatch({
                type:'tally/onSubmit',
                payload:data
            })
        },
        changeSellName(index){
            dispatch({
                type:'tally/changeVipName',
                payload:index
            })
        }
    }
    const headerProps = {
        title:"确认订单",
        onLeftClick(){
            dispatch(routerRedux.push({pathname: '/tally'}))
        }
    }

    return (
        <div>
            <Header {...headerProps}></Header>
            <PayMain {...orderMainProps}></PayMain>
        </div>
    )
}

PayType.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    tally:PropTypes.object
};

function mapStateToProps({tally}){
    return {tally}
}

export default connect(mapStateToProps)(PayType)
