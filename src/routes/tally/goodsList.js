import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import GoodsListMain from '../../components/tally/goodsList';
import {ActivityIndicator} from 'antd-mobile'


const GoodsList = ({location,dispatch,tally,loading}) => {
    
    const {dataList,totalPage,leftData} = tally;

    const goodsListMainProps = {
            dataList,
            totalPage,
            onSucceed(){
                dispatch(routerRedux.push({
                    pathname:'/'
                }))
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
                    pathname:'/manageList/addManage'
                }))
            },
            loadMore(pageIndex,resolve){
                //加载更多
                // dispatch({
                //     type:'tally/getManageList',
                //     payload:{
                //         pageIndex,
                //         resolve,
                //     }
                // })
            }
    }


    const headerProps = {
        title:leftData.name,
        rightContent:<div><img src={require('../../assets/add.png')} alt=""/>新增商品</div>,
        onLeftClick(){
            dispatch(routerRedux.goBack())
        },
        onAddVip(){
            dispatch({
                type:'manage/saveEditData',
                payload:{}
            })
            dispatch(routerRedux.push({
                pathname:'/tally/addCommodity'
            }))
        }
    }


    return (
        <div>
            <ActivityIndicator
                toast
                text="正在加载"
                animating={loading.models.tally}
            />
            <Header {...headerProps}></Header>
            <GoodsListMain {...goodsListMainProps}></GoodsListMain>
        </div>
    )
}

GoodsList.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    tally:PropTypes.object
};

function mapStateToProps({tally,loading}){
    return {tally,loading}
}

export default connect(mapStateToProps)(GoodsList)
