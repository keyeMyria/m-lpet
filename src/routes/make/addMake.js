import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import AddMakeListMain from '../../components/make/addMake';



const ADDMake = ({location,dispatch,make}) => {
    
    const {vipData} = make;

    const addMakeListProps = {
        vipData,
        getVipData(){
            dispatch(routerRedux.push({
                pathname:'/vipList',
                query:{
                    isVip:'2'
                }
            }))
        },
        onSubmit(data){
            dispatch({
                type:'make/addMake',
                payload:data
            })
        }
    }
    
    const headerProps = {
        title:"新增预约",
        onLeftClick(){
            dispatch(routerRedux.push({
                pathname:'/make'
            }))
        },
        
    }

    return (
        <div>
            <Header {...headerProps}></Header>
            <AddMakeListMain {...addMakeListProps}></AddMakeListMain>
        </div>
    )
}

ADDMake.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    make:PropTypes.object
};

function mapStateToProps({make}){
    return {make}
}

export default connect(mapStateToProps)(ADDMake)
