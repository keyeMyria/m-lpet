import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import SetIntegralMain from '../../components/system/setIntegral';

const SetIntegral = ({location,dispatch,system}) => {
    
    const {} = system;

    const setIntegralMainProps = {
        
    }
    const headerProps = {
        title:"积分设置",
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
    }


    return (
        <div>
            <Header {...headerProps}></Header>
            <SetIntegralMain {...setIntegralMainProps}/>
        </div>
    )
}

SetIntegral.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    system:PropTypes.object
};

function mapStateToProps({system}){
    return {system}
}

export default connect(mapStateToProps)(SetIntegral)
