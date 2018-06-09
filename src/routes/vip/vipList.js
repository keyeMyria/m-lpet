import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import VipListMain from '../../components/vip/vipList.js';
import {ActivityIndicator} from 'antd-mobile'
import qs from 'qs'

const VipList = ({location,dispatch,vip,loading}) => {
    
    const {vipList,isVip,selectedSegmentIndex} = vip;

    const vipListProps = {
        vipList,
        isVip,
        selectedSegmentIndex,
        onChangeTabs(index){
            dispatch({
                type:'vip/changeSelectedSegmentIndex',
                payload:index
            })
            dispatch({
                type:'vip/getVipList'
            })
        },
        onSearch(value){
            dispatch({
                type:'vip/getVipList',
                payload:value
            })
        },
        onCancel(){
            dispatch({
                type:'vip/getVipList'
            })
        },
        changeVip(data){
            if(isVip == '1'){
                dispatch(routerRedux.push({
                    pathname:'/tally/affirmOrder',
                    query:{
                        vipData:data
                    }
                }))
            }else if(isVip == '2'){
                dispatch(routerRedux.push({
                    pathname:'/make/addMake',
                    query:{
                        vipData:data
                    }
                }))
            }

        },
        onLinkDetail(id){
            dispatch(routerRedux.push({
                pathname:`/vipList/vipDetail`,
                // search:qs.stringify({vipId:id})
                state:{
                    vipId:id
                }
            }))
            // dispatch(routerRedux.push('/vipList/vipDetail',{vipId:id}))
        }
    }
    
    const headerProps = {
        title:`会员列表（${vipList.length}人）`,
        rightContent:isVip == true ? '' : <div><img src={require('../../assets/add.png')} alt=""/>新增会员</div>,
        onLeftClick(){
            if(isVip){
                dispatch(routerRedux.goBack())
            }else{
                dispatch(routerRedux.push({
                    pathname:'/'
                }))
            }
            
        },
        onAddVip(){
            dispatch(routerRedux.push({
                pathname:'/vipList/addVip'
            }))
        }
    }

    return (
        <div>
            <ActivityIndicator
                toast
                text="正在加载"
                animating={loading.models.vip}
            />
            <Header {...headerProps}></Header>
            <VipListMain {...vipListProps}></VipListMain>
        </div>
    )
}

VipList.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    vip:PropTypes.object
};

function mapStateToProps({vip,loading}){
    return {vip,loading}
}

export default connect(mapStateToProps)(VipList)
