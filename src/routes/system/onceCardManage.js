import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import OnceCardManageManin from '../../components/system/onceCardManage';


const OnceCardManage = ({location,dispatch,system}) => {
    
    const {} = system;

    let onceCardManage;

    const onceCardManageMainProps = {
        
    }
    const headerProps = {
        title:"次卡管理",
        rightContent:<div><img src={require('../../assets/add.png')} alt=""/>添加次卡</div>,
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
        onAddVip(){
            onceCardManage.addVipCard();
        }
    }


    return (
        <div>
            <Header {...headerProps}></Header>
            <OnceCardManageManin ref={(node) => onceCardManage = node} {...onceCardManageMainProps}/>
        </div>
    )
}

OnceCardManage.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    system:PropTypes.object
};

function mapStateToProps({system}){
    return {system}
}

export default connect(mapStateToProps)(OnceCardManage)
