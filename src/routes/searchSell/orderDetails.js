import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import OrderDetailsMain from '../../components/searchSell/orderDetails';

const OrderDetails = ({location,dispatch,searchSell}) => {
    
    const {billDetail} = searchSell;

    const orderDetailsMainProps = {
        billDetail
    }
    const headerProps = {
        title:"订单详情",
        onLeftClick(){
            dispatch(routerRedux.goBack())
        }
    }


    return (
        <div>
            <Header {...headerProps}></Header>
            <OrderDetailsMain {...orderDetailsMainProps}></OrderDetailsMain>
        </div>
    )
}

OrderDetails.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    searchSell:PropTypes.object
};

function mapStateToProps({searchSell}){
    return {searchSell}
}

export default connect(mapStateToProps)(OrderDetails)
