import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import SearchSellMain from '../../components/searchSell/searchSell';
import {ActivityIndicator} from 'antd-mobile'


const SearchSell = ({location,dispatch,searchSell,loading}) => {
    
    const {commodityNum,sellList,total} = searchSell;

    const searchSellMainProps = {
        sellList,
        total,
        onOrderDetails(id){
            dispatch(routerRedux.push({
                pathname:'/searchSell/orderDetails',
                query:{
                    id
                }
            }))
        },
        onEndTime(data){
            dispatch({
                type:'searchSell/searchSell',
                payload:data
            })
        }
    }
    const headerProps = {
        title:"查询销售",
        onLeftClick(){
            dispatch(routerRedux.goBack())
        }
    }


    return (
        <div>
            <ActivityIndicator
                toast
                text="正在加载"
                animating={loading.models.searchSell}
            />
            <Header {...headerProps}></Header>
            <SearchSellMain {...searchSellMainProps}></SearchSellMain>
        </div>
    )
}

SearchSell.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    searchSell:PropTypes.object
};

function mapStateToProps({searchSell,loading}){
    return {searchSell,loading}
}

export default connect(mapStateToProps)(SearchSell)
