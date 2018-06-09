import React from 'react';
import {Popup,List,Button,Icon} from 'antd-mobile'
import styles from './order.less';
import PopupModal from './popupModal';
import PopupModal1 from './popupModal1';
import PopupModal2 from './popupModal2';

const toNum = (str)=> {
    const num = Number(str)
    return isNaN(num) ? 0 : num
}

class OrderMain extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            typeActive:true,
            popupIndex:1,
            orderList: this.props.orderList && this.props.orderList.map(order=> {
                return {
                    ...order,
                    discountRate: 10.0,
                    Off: 10.0,
                }
            })
        }

    }

    onTypeActive = (type) => {
        const {onTypeActive} = this.props;
        onTypeActive(type)
    }

    onPopup(parentId){
        const {popupIndex,sellList,changeSellName} = this.props;
        const popupProps = {
            title:'销售人员',
            dataList:sellList,
            onSubmit(id,name){
                changeSellName(id,name,parentId)
                Popup.hide();
            },
            onClose(){
                Popup.hide();
            }
        }
        Popup.show(<div>
                <PopupModal {...popupProps}/>
            </div>, { animationType: 'slide-up'});
    }

    onAdd = (id,num=0,price,mid,status) => {
        const {onAdd} = this.props;
        const info = {
            Id:id,
            addNumber:status ? ++num : --num,
            salePrice:price,
            Con_Category_Id:mid
        }

        if(num < 0){
            return
        }

        onAdd(info)

        const {orderList} = this.state
        if(orderList){
            const data = orderList.map(order=> {
                if(id == order.Id){
                    return {
                        ...order,
                        addNumber: num,
                        salePrice: price
                    }
                }
                return order
            }).filter(item=> item.addNumber > 0)
            this.setState({ orderList: data })
            this.props.updateTotal(this.calculateTotal(data), data)
        }
    }
    
    onCardData(){
        const {vipData,changeCard} = this.props;
        const popupProps = {
            title:'卡号选择',
            dataList:vipData.consumerCardInfo,
            onSubmit(data){
                changeCard(data)
                Popup.hide();
            },
            onClose(){
                Popup.hide();
            }
        }
        Popup.show(<div>
                <PopupModal1 {...popupProps}/>
            </div>, { animationType: 'slide-up' });
    }

    onDogData(){
        const {vipData,changDog} = this.props;
        const popupProps = {
            title:'宠物选择',
            dataList:vipData.consumerPetInfo,
            onSubmit(data){
                changDog(data)
                Popup.hide();
            },
            onClose(){
                Popup.hide();
            }
        }
        Popup.show(<div>
                <PopupModal2 {...popupProps}/>
            </div>, { animationType: 'slide-up' });
    }

    onOffChange = (key, product) => {
        const {orderList} = this.state
        if(orderList){
            const data = orderList.map((order)=> {
                if(product.Id == order.Id){
                    let discountRate = toNum(order.discountRate)
                    discountRate = discountRate + (key == "+" ? 1 : -1)
                    if(discountRate > 10){
                        discountRate = 10
                    }
                    if(discountRate < 0){
                        discountRate = 0
                    }

                    return {
                        ...order,
                        discountRate,
                        Off: discountRate,
                        discount: discountRate * toNum(order.SalePrice) / 10.0
                    }
                }
                return order
            })
            this.setState({ orderList: data })
            this.props.updateTotal(this.calculateTotal(data), data)
        }
    }

    calculateTotal = (list)=>{
        let dataList = list || this.state.dataList
        if(dataList instanceof Array){
            return dataList.reduce((sum, data) => {
                const num = data.salePrice * data.addNumber * data.discountRate / 10
                sum += toNum(num)
                return sum
            }, 0)
        }

        return 0
    }

    render(){
        const {typeActive,vipData,vipCardData,vipDogData} = this.props;
        const {orderList} = this.state
        return (
            <div className={styles.order}>
                {typeActive == true ?
                <div className="order_header">
                    <p>请选择客户类型</p>
                    <div className="select_content">
                        <div className="huiyuan" onClick={this.onTypeActive.bind(null,2)}>
                            <div className="icon"></div>
                            <div className="text">会员</div>
                        </div>
                        <div className="sanke" onClick={this.onTypeActive.bind(null,3)}>
                            <div className="icon"></div>
                            <div className="text">散客</div>
                        </div>
                    </div>
                </div>
                :
                <div className="order_header">
                    {
                        typeActive == 2 ? '' : <p>再次点击则取消</p>
                    }

                    <div className="select_content active">
                        {typeActive == 2 ?
                        <div className="huiyuan" >
                            <img src={require("../../assets/close.png")} onClick={this.onTypeActive.bind(null,true)} alt=""/>
                            <p><img src={require("../../assets/vip_active.png")} alt=""/>{vipData.Name}<img className="checkout" onClick={this.onTypeActive.bind(null,2)} src={require("../../assets/checkout.png")} alt=""/></p>
                        {/*<p onClick={this.onCardData.bind(this)}>{vipCardData.CardType}&nbsp;|&nbsp;{vipCardData.Code}&nbsp;&nbsp;余额：{vipCardData.Money}<Icon type="down" color="#108EE9" /><span>押金：{vipData.DepositMoney}</span></p>*/}
                            <p>押金：{vipData.DepositMoney}</p>
                            {vipDogData.Name ? <p onClick={this.onDogData.bind(this)}><img src={require(`../../assets/${vipDogData.Sex == '公' ? 'gong' : 'mu'}.png`)} alt=""/>{vipDogData.Name}<Icon type="down" color="#108EE9" /></p> : ''}
                        </div>
                        :
                        <div className="sanke" onClick={this.onTypeActive.bind(null,true)}>
                            <div className="icon"></div>
                            <div className="text">散客</div>
                        </div>}
                    </div>
                </div>}


                <div className="order_content">
                    {
                        orderList && orderList.map((data,index) => {
                            return (
                                <div className="order_item" key={index}>
                                    <div className="item_header">
                                        <div className="item_img"><img src={data.CommodityImg ? data.CommodityImg : require("../../assets/img.png")} alt=""/></div>
                                        <div className="item_title">
                                            <h2>{data.Con_Parent_Category_Name}</h2>
                                            <p>{data.Name}</p>
                                        </div>
                                        <div className="item_control">
                                            <button className="sub" onClick={this.onAdd.bind(null,data.Id,data.addNumber,data.SalePrice,data.Con_Category_Mid,false)}>-</button>
                                            <span>{data.addNumber}</span>
                                            <button className="add" onClick={this.onAdd.bind(null,data.Id,data.addNumber,data.SalePrice,data.Con_Category_Mid,true)}>+</button>
                                        </div>
                                    </div>

                                    <div className="item_info">
                                    <span>应收：<i>{(data.salePrice * data.addNumber).toFixed(2)}</i></span>
                                    <span>折扣：
                                        <div className="item_control_off">
                                            <button className="sub" onClick={this.onOffChange.bind(null, '-', data)}>-</button>
                                            <span>{data.discountRate}</span>
                                            <button className="add" onClick={this.onOffChange.bind(null, '+', data)}>+</button>
                                        </div>
                                    </span>
                                    <span>实收：<i>{(data.salePrice * data.addNumber * data.discountRate / 10).toFixed(2)}</i></span>
                                    </div>

                                    <div className="item_crew" onClick={this.onPopup.bind(this,data.Id)}>
                                        销售人员：<span>{data.Sale_Con_Employee_Name}</span><Icon type="down" color="#108EE9" />
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


export default OrderMain
