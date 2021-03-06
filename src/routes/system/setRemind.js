import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import SetRemindMain from '../../components/system/setRemind';

const SetRemind = ({location,dispatch,system}) => {
    
    const {} = system;

    const setRemindMainProps = {
        
    }
    const headerProps = {
        title:"提醒设置",
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
    }


    return (
        <div>
            <Header {...headerProps}></Header>
            <SetRemindMain {...setRemindMainProps}/>
        </div>
    )
}

SetRemind.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    system:PropTypes.object
};

function mapStateToProps({system}){
    return {system}
}

export default connect(mapStateToProps)(SetRemind)
