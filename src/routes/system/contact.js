import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import ContactMain from '../../components/system/contact';

const Contact = ({location,dispatch,system}) => {
    
    const {} = system;

    const contactMainProps = {
        
    }
    const headerProps = {
        title:"联系我们",
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
    }


    return (
        <div>
            <Header {...headerProps}></Header>
            <ContactMain {...contactMainProps}/>
        </div>
    )
}

Contact.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    system:PropTypes.object
};

function mapStateToProps({system}){
    return {system}
}

export default connect(mapStateToProps)(Contact)
