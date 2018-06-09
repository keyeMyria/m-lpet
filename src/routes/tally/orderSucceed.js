import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import SucceedMain from '../../components/tally/orderSucceed';

const AffirmOrder = ({location,dispatch,tally}) => {
    
    const {catTotal} = tally;

    const succeedMainProps = {
            catTotal,
            onSucceed(){
                dispatch(routerRedux.push({
                    pathname:'/'
                }))
            }
    }
    const headerProps = {
        title:"下单成功",
        onLeftClick(){
            dispatch(routerRedux.push({ pathname: '/tally'}))
        }
    }

    return (
        <div>
            <Header {...headerProps}></Header>
            <SucceedMain {...succeedMainProps}></SucceedMain>
        </div>
    )
}

AffirmOrder.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    tally:PropTypes.object
};

function mapStateToProps({tally}){
    return {tally}
}

export default connect(mapStateToProps)(AffirmOrder)
