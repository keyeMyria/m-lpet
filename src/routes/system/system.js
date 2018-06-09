import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import SystemMain from '../../components/system/system';

const System = ({location,dispatch,system}) => {
    
    const {} = system;

    const systemMainProps = {
        
    }
    const headerProps = {
        title:"系统设置",
        rightContent:<span style={{color:'#8C8C8C'}}>退出账号</span>,
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
        onAddVip(){
            
        }
       
    }


    return (
        <div>
            <Header {...headerProps}></Header>
            <SystemMain {...systemMainProps}/>
        </div>
    )
}

System.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    system:PropTypes.object
};

function mapStateToProps({system}){
    return {system}
}

export default connect(mapStateToProps)(System)
