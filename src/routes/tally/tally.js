import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';
import TallyMain from '../../components/tally/index.js';
import {ActivityIndicator} from 'antd-mobile'
import { routerReducer } from 'react-router-redux';

const Tally = ({location,dispatch,tally,loading}) => {

    const {typeList,dataList, orderList,catNum,catTotal,typeIndex,companys} = tally;

    const tallyMainProps = {
        typeList,
        dataList,
        typeIndex,
        companys,
        getDataList(id,index,name){
            dispatch({
                type:'tally/getData',
                payload:{id,index,name}
            })
        },
        onSearch(value){
            dispatch(routerRedux.push({
                pathname:'/tally/search'
            }))
        },
        onEditPress(data,value){
            dispatch({
                type:'tally/editPress'
            })
        },
        onAdd(data){
            dispatch({
                type:'tally/addcart',
                payload:data
            })
        },
        addCommodity(){

        }
    }
    const headerProps = {
        title:"收银记账",
        rightContent:<div>扫码收银<img src={require('../../assets/searchCode.png')} alt=""/></div>,
        onAddVip(){
            dispatch(routerRedux.push({
                pathname:'/tally/searchCode'
            }))
        },
        onLeftClick(){
            dispatch(routerRedux.push({
                pathname:'/'
            }))
        }
    }
    const footerProps = {
        catNum,
        catTotal,
        onDownOrder(){
            dispatch({
                type:'tally/updateState',
                payload: {
                    typeActive: true,
                    orderData: orderList
                }
            })
            dispatch(routerRedux.push({
                pathname:'/tally/affirmOrder'
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
            <TallyMain {...tallyMainProps}></TallyMain>
            <Footer {...footerProps}></Footer>
        </div>
    )
}

Tally.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    tally:PropTypes.object
};

function mapStateToProps({tally,loading}){
    return {tally,loading}
}

export default connect(mapStateToProps)(Tally)
