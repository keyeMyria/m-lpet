import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import RegisterMain from '../../components/register/register';

const Register = ({location,dispatch,register}) => {
    
    const {addCode,outCode,employeeList,historyList} = register;

    const registerMainProps = {
        addCode,
        outCode,
        employeeList,
        historyList,
        onSubmit(data){
            dispatch({
                type:'register/addCharge',
                payload:data
            })
        }
    }
    const headerProps = {
        title:"注册",
        rightContent:"登录",
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
        onAddVip(){
            dispatch(routerRedux.push('/login'))
        }
       
    }


    return (
        <div>
            <Header {...headerProps}></Header>
            <RegisterMain {...registerMainProps}/>
        </div>
    )
}

Register.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    register:PropTypes.object
};

function mapStateToProps({register}){
    return {register}
}

export default connect(mapStateToProps)(Register)
