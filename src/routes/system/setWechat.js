import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import SetWechatMain from '../../components/system/setWechat';

const SetWechat = ({location,dispatch,system}) => {
    
    const {} = system;

    const setWechatMainProps = {
        
    }
    const headerProps = {
        title:"微信设置",
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
    }


    return (
        <div>
            <Header {...headerProps}></Header>
            <SetWechatMain {...setWechatMainProps}/>
        </div>
    )
}

SetWechat.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    system:PropTypes.object
};

function mapStateToProps({system}){
    return {system}
}

export default connect(mapStateToProps)(SetWechat)
