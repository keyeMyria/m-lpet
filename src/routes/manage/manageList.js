import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import ManageListMain from '../../components/manage/manageList';
import {ActivityIndicator} from 'antd-mobile'


const ManageList = ({location,dispatch,manage,loading}) => {

    const {manageList,moneyData,totalPage,keyword,pageIndex} = manage;

    const manageListProps = {
        manageList,
        moneyData,
        totalPage,
        pageIndex,
        keyword,
        onSearch(value){
            //商品搜索
            dispatch({
                type:'manage/addPageIndex',
                payload:1
            })
            dispatch({
                type:'manage/getManageList',
                payload:{
                    keyword:value,
                }
            })
            dispatch({
                type:'manage/saveKeyword',
                payload:value
            })
        },
        onSearchChange(value){
            dispatch({
                type:'manage/saveKeyword',
                payload:value
            })
        },
        onEdit(data){
            dispatch({
                type:'manage/saveEditData',
                payload:data
            })
            dispatch({
                type:"manage/changeCommodityName",
                payload:{id:data.Con_Category_Mid,name:data.Con_Category_Name}
            })
            dispatch(routerRedux.push({
                pathname:'/manageList/addManage',
                query:{
                   Id:data.father_Category_id
                }
            }))
        },
        addCommit(){
            dispatch({
                type:'manage/saveEditData',
                payload:{}
            })
            dispatch({
                type:"manage/changeCommodityName",
                payload:{id:'',name:''}
            })
            dispatch(routerRedux.push({
                pathname:'/manageList/addManage'
            }))
        },
        loadMore(resolve){
            //加载更多
            dispatch({
                type:'manage/getManageList',
                payload:{
                    keyword,
                    resolve
                }
            })
        },
        saveQRCode(value){
            dispatch({
                type:'manage/saveKeyword',
                payload:value
            })
            dispatch({
                type:'manage/addPageIndex',
                payload:1
            })
            dispatch({
                type:'manage/getManageList',
                payload:{
                    keyword:value,

                }
            })
        }
    }

    const headerProps = {
        title:"商品管理",
        rightContent:<div>编辑分类</div>,
        onLeftClick(){
            dispatch(routerRedux.push({
                pathname:'/'
            }))
        },
        onAddVip(){
            dispatch(routerRedux.push({
                pathname:'/manageList/manageType'
            }))
        }
    }



    return (
        <div>
            <ActivityIndicator
                toast
                text="正在加载"
                animating={loading.models.manage}
            />
            <Header {...headerProps}></Header>
            <ManageListMain {...manageListProps}></ManageListMain>
        </div>
    )
}

ManageList.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    manage:PropTypes.object
};

function mapStateToProps({manage,loading}){
    return {manage,loading}
}

export default connect(mapStateToProps)(ManageList)
