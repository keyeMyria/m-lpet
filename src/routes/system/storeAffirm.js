import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import StoreAffirmMain from '../../components/system/storeAffirm';

const StoreAffirm = ({location,dispatch,system}) => {
    
    const {} = system;

    const storeAffirmMainProps = {
        
    }
    const headerProps = {
        title:"店铺认证",
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
    }


    return (
        <div>
            <Header {...headerProps}></Header>
            <StoreAffirmMain {...storeAffirmMainProps}/>
        </div>
    )
}

StoreAffirm.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    system:PropTypes.object
};

function mapStateToProps({system}){
    return {system}
}

export default connect(mapStateToProps)(StoreAffirm)
