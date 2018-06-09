import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import styles from './vipDetail.less'
import Header from '../../components/layout/header';
import VipDetailMain from '../../components/vip/vipDetail';

const VipDetail = ({location,dispatch,vip}) => {
    
    const {} = vip;

    const vipDetailMainProps = {
        
    }
    const headerProps = {
        title:"会员详情",
        rightContent:<span style={{color:'#fff'}}>删除</span>,
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
        onAddVip(){
            
        }
       
    }

    return (
        <div className={styles.vipDetail}>
            <Header {...headerProps}></Header>
            <VipDetailMain {...vipDetailMainProps}/>
        </div>
    )
}

VipDetail.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    vip:PropTypes.object
};

function mapStateToProps({vip}){
    return {vip}
}

export default connect(mapStateToProps)(VipDetail)
