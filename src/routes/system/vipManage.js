import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import VipManageMain from '../../components/system/vipManage';


const VipManage = ({location,dispatch,system}) => {
    
    const {} = system;

    let vipManage;

    const vipManageMainProps = {
        
    }
    const headerProps = {
        title:"会员卡管理",
        rightContent:<div><img src={require('../../assets/add.png')} alt=""/>添加会员卡</div>,
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
        onAddVip(){
            vipManage.addVipCard();
        }
    }


    return (
        <div>
            <Header {...headerProps}></Header>
            <VipManageMain ref={(node) => vipManage = node} {...vipManageMainProps}/>
        </div>
    )
}

VipManage.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    system:PropTypes.object
};

function mapStateToProps({system}){
    return {system}
}

export default connect(mapStateToProps)(VipManage)
