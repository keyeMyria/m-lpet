import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import LoginMain from '../components/login/login.js';

const Login = ({location,dispatch,login}) => {
    
    const {} = login;

    const loginProps = {
        onSubmit(data){
            dispatch({
                type:'login/submit',
                payload:data
            })
            // dispatch(routerRedux.push({
            //     pathname:'/'
            // }))
        }
    }

    return (
        <div>
            <LoginMain {...loginProps}/>
        </div>
    )
}

Login.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    login:PropTypes.object
};

function mapStateToProps({login}){
    return {login}
}

export default connect(mapStateToProps)(Login)
