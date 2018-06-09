import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../../components/layout/header';
import Footer from '../../components/tally/footer';
import OrderMain from '../../components/tally/order';
import {ActivityIndicator,Toast} from 'antd-mobile'


const AffirmOrder = ({location,dispatch,tally,loading}) => {

    const {orderData,catNum,catTotal,sellList,typeActive,vipData,vipCardData,vipDogData} = tally;

    const orderMainProps = {
        orderList: orderData,
        sellList,
        typeActive,
        vipData,
        vipCardData,
        vipDogData,
        onAdd(data){
            dispatch({
                type:'tally/addcart_affirmOrder',
                payload:data
            })
        },
        changeSellName(id,name,parentId){
            dispatch({
                type:'tally/changeSellName',
                payload:{id,name,parentId}
            })
        },
        onTypeActive(type){

            if(type == 2){
                dispatch(routerRedux.push({
                    pathname:'/viplist',
                    query:{
                       isVip:'1'
                    }
                }))
            }else{
                dispatch({
                    type:'tally/changeType',
                    payload:type
                })
            }

        },
        changeCard(data){
            dispatch({
                type:'tally/changeCard',
                payload:data
            })
        },
        changDog(data){
            dispatch({
                 type:'tally/changDog',
                payload:data
            })
        },
        updateTotal(total, data){
            dispatch({
                type: 'tally/updateState',
                payload: {
                    catTotal: total,
                    orderData: data
                }
            })
        }
    }
    const headerProps = {
        title:"确认订单",
        onLeftClick(){
            dispatch(routerRedux.push({
                pathname:'/tally'
            }))
        }
    }
    const footerProps = {
        catNum,
        catTotal,
        orderList: orderData,
        onDownOrder(){
            if(typeActive != true){
                dispatch({
                    type:'tally/recordBill'
                })
            }else{
                Toast.info('请选择客户类型', 0.8)
            }
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
            <OrderMain {...orderMainProps}></OrderMain>
            <Footer {...footerProps}></Footer>
        </div>
    )
}

AffirmOrder.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    tally:PropTypes.object
};

function mapStateToProps({tally,loading}){
    return {tally,loading}
}

export default connect(mapStateToProps)(AffirmOrder)
