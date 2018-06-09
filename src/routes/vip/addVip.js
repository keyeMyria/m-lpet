import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import AddVipMain from '../../components/vip/addVip.js';
import {ActivityIndicator} from 'antd-mobile'


const AddVip = ({location,dispatch,vip,loading}) => {
    
    const {dogInfoData} = vip;

    const addVipProps = {
        dogInfoData,
        onAddPet(){
            //添加宠物信息
            dispatch({
                type:'vip/addDogInfoData'
            })
        },
        onRemovePet(index){
            //删除宠物信息
            dispatch({
                type:'vip/removeDogInfo',
                payload:index
            })
        },
        onChecked(id,value){
            //改变状态
            dispatch({
                type:'vip/changeDogInfo',
                payload:{id,value}
            })
        },
        onDatePicker(id,value){
            dispatch({
                type:'vip/changeDate',
                payload:{id,value}
            })
        },
        onChangeDogName(id,value){
            dispatch({
                type:'vip/changeDogName',
                payload:{id,value}
            })
        },
        onChangeRemark(id,value){
            dispatch({
                type:'vip/changeRemark',
                payload:{id,value}
            })
        },
        onSubmit(data){
            dispatch({
                type:'vip/addVip',
                payload:data
            })
        }
    }
    
    const headerProps = {
        title:"新增会员",
        rightContent:'',
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
    }

    return (
        <div>
            <ActivityIndicator
                toast
                text="正在加载"
                animating={loading.models.vip}
            />
            <Header {...headerProps}></Header>
            <AddVipMain {...addVipProps}></AddVipMain>
        </div>
    )
}

AddVip.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    vip:PropTypes.object
};

function mapStateToProps({vip,loading}){
    return {vip,loading}
}

export default connect(mapStateToProps)(AddVip)
