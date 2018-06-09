import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import AddBillMain from '../../components/other/addBill';

const AddBill = ({location,dispatch,other}) => {
    
    const {addCode,outCode,employeeList,historyList} = other;

    const addBillMainProps = {
        addCode,
        outCode,
        employeeList,
        historyList,
        onSubmit(data){
            dispatch({
                type:'other/addCharge',
                payload:data
            })
        }
    }
    const headerProps = {
        title:"新增收支",
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
       
    }


    return (
        <div>
            <Header {...headerProps}></Header>
            <AddBillMain {...addBillMainProps}></AddBillMain>
        </div>
    )
}

AddBill.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    other:PropTypes.object
};

function mapStateToProps({other}){
    return {other}
}

export default connect(mapStateToProps)(AddBill)
