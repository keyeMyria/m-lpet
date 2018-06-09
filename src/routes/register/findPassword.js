import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import FindPasswordMain from '../../components/register/findPassword';

const FindPassword = ({location,dispatch,register}) => {
    
    const {addCode,outCode,employeeList,historyList} = register;

    const findPasswordMainProps = {
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
        title:"找回密码",
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
            <FindPasswordMain {...findPasswordMainProps}/>
        </div>
    )
}

FindPassword.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    register:PropTypes.object
};

function mapStateToProps({register}){
    return {register}
}

export default connect(mapStateToProps)(FindPassword)
