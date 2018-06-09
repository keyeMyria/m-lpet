import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import StaffManageMain from '../../components/system/staffManage';

const StaffManage = ({location,dispatch,system}) => {
    
    const {} = system;

    const staffManageMainProps = {
        
    }
    const headerProps = {
        title:"员工管理",
        rightContent:<div><img src={require('../../assets/add.png')} alt=""/>添加员工</div>,        
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
        onAddVip(){
            
        }
    }


    return (
        <div>
            <Header {...headerProps}></Header>
            <StaffManageMain {...staffManageMainProps}/>
        </div>
    )
}

StaffManage.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    system:PropTypes.object
};

function mapStateToProps({system}){
    return {system}
}

export default connect(mapStateToProps)(StaffManage)
