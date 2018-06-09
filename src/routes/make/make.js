import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import MakeListMain from '../../components/make/make';
import {ActivityIndicator} from 'antd-mobile';

const Make = ({location,dispatch,make,loading}) => {

    const {makeList, queryFilter} = make;

    const makeListProps = {
        makeList,
        queryFilter,
        confimComing(data){
            dispatch({
                type:'make/confimComing',
                payload:data
            })
        },
        onEndTime(data){
            dispatch({
                type:'make/getMakeList',
                payload:data
            })
        },
      onSendMessage(type,params){
          if(type == 'sms'){
            dispatch({
              type:'make/sendAppoMessage',
              payload:params
            })
          } else {
            dispatch({
              type:'make/sendWeChatAppoMessage',
              payload:params
            })
          }
      }
    }

    const headerProps = {
        title:"预约服务",
        rightContent:<div><img src={require('../../assets/add.png')} alt=""/>新增预约</div>,
        onLeftClick(){
            dispatch(routerRedux.push({
                pathname:'/'
            }))
        },
        onAddVip(){
            dispatch(routerRedux.push({
                pathname:'/make/addMake'
            }))
        }

    }

    return (
        <div>
            <ActivityIndicator
                toast
                text="正在加载"
                animating={loading.models.make}
            />
            <Header {...headerProps}></Header>
            <MakeListMain {...makeListProps}></MakeListMain>
        </div>
    )
}

Make.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    make:PropTypes.object
};

function mapStateToProps({make,loading}){
    return {make,loading}
}

export default connect(mapStateToProps)(Make)
