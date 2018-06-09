import React from 'react';
import {Button,List,DatePicker} from 'antd-mobile';
import { Link } from 'dva/router'
import styles from './orderDetails.less';
import EmptyData from '../../components/other/empty'

const Item = List.Item;

const toNum = (str) => {
    const num = Number(str)
    return isNaN(num) ? 0 : num
}

class OrderDetailsMain extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }

    }



    render(){
        const {billDetail} = this.props;

        const billResult = billDetail.billResult;
        const billPayResult = billDetail.billPayResult;
        const consumptionResult = billDetail.consumptionResult;

        var str = []
        if(billPayResult&&billPayResult.length>0){
          billPayResult.forEach(item=>{
             str.push(<p style={{marginRight:5}}>{item.Sys_Paytype_Name}:{item.Money?item.Money:'0.00'}</p>)
          })
        } else {
          str.push(<p style={{marginRight:5}}>0.00</p>)
        }
        return (
            !billResult ?
            <EmptyData/> 
            :
            <div className={styles.orderDetailsMain}>
                <List>
                    <Item
                        extra={billResult&&billResult.CreateTime}
                        >下单时间
                    </Item>
                    <Item
                        extra={billResult&&billResult.Code}
                        >订单号
                    </Item>
                    <Item
                        extra={
                            <div>
                              {str}
                            </div>
                        }
                        >实际支付
                    </Item>
                    <Item
                        extra={`${billResult&&billResult.ConsumerName}${billResult&&billResult.petName ? `(${billResult&&billResult.petName})` : ''}`}
                        >顾客
                    </Item>
                    <Item
                        extra={billResult&&billResult.Con_Employee_Name}
                        >收银员
                    </Item>
                </List>

                <div className="order_card">
                    {
                      consumptionResult.length != 0 &&consumptionResult.map((data,index) => {
                            return (
                                <div className="card" key={index}>
                                    <div className="header">
                                        <div className="icon"><img src={data.CommodityImg ? data.CommodityImg : require("../../assets/img.png")} alt=""/></div>
                                        <div className="text">
                                            <div className="left">
                                                <div className="name">{data.Con_Parent_Category_Name}</div>
                                                <div>{data.CommodityName}</div>
                                            </div>
                                            <div>×{data.Quantity}</div>
                                        </div>
                                    </div>
                                    <div className="info">
                                        <div className="price">
                                            <div>应收：{(toNum(data.Quantity) * toNum(data.Price)).toFixed(2)}</div>
                                            <div>折扣：<span>{data.Off ? toNum(data.Off).toFixed(2) : '10'}</span></div>
                                            <div>实收：<span>{(toNum(data.Quantity) * toNum(data.Price) * toNum(data.Off) / 10.0).toFixed(2)}</span></div>
                                        </div>
                                        <div>销售人员：{data.Sale_Con_Employee_Name}</div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}


export default OrderDetailsMain
