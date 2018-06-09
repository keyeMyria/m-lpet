import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import PowerMain from '../../components/system/power';

const Power = ({location,dispatch,system}) => {
    
    const {} = system;

    const powerMainProps = {
        
    }

    const headerProps = {
        title:"李冰的权限设置",
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
    }

    return (
        <div>
            <Header {...headerProps}></Header>
            <PowerMain {...powerMainProps}/>
        </div>
    )
}

Power.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    system:PropTypes.object
};

function mapStateToProps({system}){
    return {system}
}

export default connect(mapStateToProps)(Power)
