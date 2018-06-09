import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import CompanyMain from '../../components/system/company';

const Company = ({location,dispatch,system}) => {
    
    const {} = system;

    const companyMainProps = {
        
    }
    const headerProps = {
        title:"往来单位",
        rightContent:<div><img src={require('../../assets/add.png')} alt=""/>添加往来单位</div>,
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
            <CompanyMain {...companyMainProps}/>
        </div>
    )
}

Company.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    system:PropTypes.object
};

function mapStateToProps({system}){
    return {system}
}

export default connect(mapStateToProps)(Company)
