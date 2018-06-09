import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Footer from '../../components/layout/footer';
import SearchMain from '../../components/tally/search.js';
import GetCode from '../../components/tally/getCode.js';
import Header from '../../components/layout/header';
import {ActivityIndicator} from 'antd-mobile'


const SearchCode = ({location,dispatch,tally,loading}) => {
    
    const {searchData,catNum,catTotal,keyword, orderList} = tally;

    const searchMainProps = {
        keyword,
        searchData,
        placeholder:'手动输入条形码（大于5位，不区分大小写）',
        cancelText:'确认',
        onSearch(value){
            dispatch({
                type:'tally/saveKeyword',
                payload:value
            })
            
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
        onCancel(){
            dispatch({
                type:'tally/searchData',
                payload:keyword
            })
        }
    }

    const headerProps = {
        title:"扫码收银",
        onLeftClick(){
            dispatch(routerRedux.push({
                pathname:'/tally'
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
                    orderData: orderList
                }
            })
            dispatch(routerRedux.push({
                pathname:'/tally/affirmOrder'
            }))
        }
    }

    const getCodeProps = {
        saveQRCode(value){
            dispatch({
                type:'tally/saveKeyword',
                payload:value
            })
            dispatch({
                type:'tally/searchData',
                payload:value
            })
        }
    }

    return (
        <div>
            <ActivityIndicator
                toast
                text="正在加载"
                animating={!!loading.models.tally}
            />
            <Header {...headerProps}></Header>
            <GetCode {...getCodeProps}/>
            <SearchMain {...searchMainProps}></SearchMain>
            <Footer {...footerProps}></Footer>
        </div>
    )
}

SearchCode.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    tally:PropTypes.object
};

function mapStateToProps({tally,loading}){
    return {tally,loading}
}

export default connect(mapStateToProps)(SearchCode)
