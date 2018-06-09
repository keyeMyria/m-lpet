import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import SetDiscountMain from '../../components/system/setDiscount';
import EditDiscount from '../../components/system/setDiscount/editDiscount'

const SetDiscount = ({location,dispatch,system}) => {
    
    const {} = system;

    const setDiscountMainProps = {
        
    }
    const headerProps = {
        title:"折扣设置",
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
    }


    return (
        <div>
            <Header {...headerProps}></Header>
            {/*<SetDiscountMain {...setDiscountMainProps}/>*/}
            <EditDiscount />
        </div>
    )
}

SetDiscount.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    system:PropTypes.object
};

function mapStateToProps({system}){
    return {system}
}

export default connect(mapStateToProps)(SetDiscount)
