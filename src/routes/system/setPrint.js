import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import SetPrintMain from '../../components/system/setPrint';

const SetPrint = ({location,dispatch,system}) => {
    
    const {} = system;

    const setPrintMainProps = {
        
    }
    const headerProps = {
        title:"打印设置",
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
    }


    return (
        <div>
            <Header {...headerProps}></Header>
            <SetPrintMain {...setPrintMainProps}/>
        </div>
    )
}

SetPrint.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    system:PropTypes.object
};

function mapStateToProps({system}){
    return {system}
}

export default connect(mapStateToProps)(SetPrint)
