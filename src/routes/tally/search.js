import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Footer from '../../components/layout/footer';
import SearchMain from '../../components/tally/search.js';
import {ActivityIndicator} from 'antd-mobile'


const Search = ({location,dispatch,tally,loading}) => {
    
    const {searchData,catNum,catTotal, keyword} = tally;

    const searchMainProps = {
        keyword,
        searchData,
        onSearch(value){
            dispatch({
                type:'tally/saveKeyword',
                payload:value
            })
            dispatch({
                type:'tally/searchData',
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
                type:'tally/onCancel'
            })
            dispatch(routerRedux.push({
                pathname:'/tally',
            }))
            
        }
    }
    

    const footerProps = {
        catNum,
        catTotal,
        onDownOrder(){
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
                animating={!!loading.models.tally}
            />
            <SearchMain {...searchMainProps}></SearchMain>
            <Footer {...footerProps}></Footer>
        </div>
    )
}

Search.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    tally:PropTypes.object
};

function mapStateToProps({tally,loading}){
    return {tally,loading}
}

export default connect(mapStateToProps)(Search)
