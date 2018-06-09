import React from 'react';
import { Button,List,Popup,Icon,InputItem,Modal,Toast} from 'antd-mobile';
import styles from './vipRefill.less';
import PopupModal1 from './popupModal1';
import PopupModal from './popupModal';
import { createForm } from 'rc-form';
const Item = List.Item;
const alert = Modal.alert;



class VipRefill extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            cardTypeIndex:1,
            payTypeIndex:[0],
            money:0,
            countMoney:'',//计算金额
        }

    }

    onCardType(index){
        this.setState({
            cardTypeIndex:index
        })
        const {clearCardCodeName} = this.props;
        clearCardCodeName()
    }

    onPayType(index){
        const {payTypeIndex} = this.state;
        if(payTypeIndex.indexOf(index) == -1){
             payTypeIndex.push(index)
            this.setState({
                payTypeIndex
            })
        }else{
            payTypeIndex.splice(payTypeIndex.indexOf(index),1)
            this.setState({
                payTypeIndex
            })
        }
    }

    onChangeType(){
        const {sellList,onSellName} = this.props;
        const popupProps = {
            title:'销售人员',
            dataList:sellList,
            onSubmit(id,name){
                onSellName(id,name);
                Popup.hide();
            },
            onClose(){
                Popup.hide();
            }
        }
        Popup.show(<div>
                <PopupModal1 {...popupProps}/>
            </div>, { animationType: 'slide-up'});
    }

    onChangeCard(cardTypeIndex){
        const {cardCodeList,onChangeCardCode} = this.props;
        const self = this;
        const popupProps = {
            title:'卡号',
            dataList:cardTypeIndex == '1' ? cardCodeList.consumerCardInfo : cardCodeList.consumerMetercardInfo,
            onSubmit(id,code){
                onChangeCardCode(id,code);
                Popup.hide();
            },
            onClose(){
                Popup.hide();
            }
        }
        Popup.show(<div>
                <PopupModal {...popupProps}/>
            </div>, { animationType: 'slide-up' });
    }

    onSubmit(){
        const {onUpdateCard,cardCodeId} = this.props;
        const {validateFields} = this.props.form;
        const {cardTypeIndex,payTypeIndex} = this.state;
        const payName = ['现金支付','银行卡支付','支付宝支付','微信支付','会员卡','','押金支付']

        validateFields((error,value) => {
            let newData = []
            payTypeIndex.forEach((data,index) => {
                newData.push({
                    Sys_Paytype_Mid:data,
                    Sys_Paytype_Name:payName[data],
                    PayTotal:value[`PayTotal${data}`],
                })
            })
            let total = 0;
            newData.forEach((data,index) => {
              if(data.PayTotal){
                let num = parseFloat(data.PayTotal)
                total += num
              }
            })
            if(!cardCodeId){
				Toast.info('请选择卡号', 0.8)
				return false
            }
            
            if(total == 0){
				Toast.info('请输入充值金额', 0.8)
                return false
            }

            const data = {
                ...value,
                Sys_Paytypes:newData,
                MoneyValue:total,
                BonusValue:value.Bonus,
                PresentMoneyValue:value.PresentMoney
                // Sys_CardType_Mid:payTypeIndex
            }
            alert('提示', `充值总额：${total ? total.toFixed(2) : '0.00'}`, [{ text: '取消'},{ text: '确定',onPress:() => onUpdateCard(cardTypeIndex,data)}])
            // onUpdateCard(cardTypeIndex,data)
        })
    }


    changeMoney(value){
        this.setState({
            money:value
        })
    }




    render(){
        const {cardTypeIndex,payTypeIndex,money} = this.state;
        const {cardCodeName,vipName,sellName} = this.props;
        const {getFieldProps} = this.props.form;
        return (
            <div className={styles.vipRefill}>
                <div className="card_type">
                    <p>请选择充值类型</p>
                    <div className="type_content">
                        <div
                            onClick={this.onCardType.bind(this,1)}
                            className={`card_item card1 ${cardTypeIndex == 1 ? 'active' : ''}`}>
                            <div className="icon"></div>
                            <div className="text">储值卡</div>
                        </div>
                        <div
                            onClick={this.onCardType.bind(this,2)}
                            className={`card_item card2 ${cardTypeIndex == 2 ? 'active' : ''}`}>
                            <div className="icon"></div>
                            <div className="text">次卡</div>
                        </div>
                    </div>
                </div>

                { cardTypeIndex == 1 ? <div className="refill_content">
                    <List>

                        <Item
                            extra={<div className="com" onClick={this.onChangeCard.bind(this,cardTypeIndex)}>{cardCodeName ? cardCodeName : '点击选择'}<Icon type="down" color="#108EE9" /></div>}
                        >卡号</Item>

                        <Item
                            extra={vipName}
                        >会员姓名</Item>

                        <Item>
                            <div>
                                <div className="refill_type">
                                    <div className="name">充值方式：</div>
                                    <div className="refill_lists">
                                        <div className={`refill_item ${payTypeIndex.indexOf(0) != -1 ? 'active' : ''}`} onClick={this.onPayType.bind(this,0)}>
                                            <div className="icon"></div>
                                            <div className="text">现金</div>
                                        </div>
                                        <div className={`refill_item ${payTypeIndex.indexOf(3) != -1 ? 'active' : ''}`} onClick={this.onPayType.bind(this,3)}>
                                            <div className="icon"></div>
                                            <div className="text">微信</div>
                                        </div>
                                        <div className={`refill_item ${payTypeIndex.indexOf(2) != -1 ? 'active' : ''}`} onClick={this.onPayType.bind(this,2)}>
                                            <div className="icon"></div>
                                            <div className="text">支付宝</div>
                                        </div>
                                        <div className={`refill_item ${payTypeIndex.indexOf(1) != -1 ? 'active' : ''}`} onClick={this.onPayType.bind(this,1)}>
                                            <div className="icon"></div>
                                            <div className="text">银行卡</div>
                                        </div>
                                    </div>
                                    {payTypeIndex.indexOf(0) != -1 ? <div className="payType">
                                        <div className="left">
                                            <div className="pay_name">现金支付</div>
                                        </div>
                                        <div className="right">
                                            <InputItem
                                                type="money"
                                                {...getFieldProps('PayTotal0')}
                                                placeholder="0.00" />
                                        </div>
                                    </div> : ''}
                                    {payTypeIndex.indexOf(3) != -1 ? <div className="payType">
                                        <div className="left">
                                            <div className="pay_name">微信支付</div>
                                        </div>
                                        <div className="right">
                                            <InputItem
                                                type="money"
                                                {...getFieldProps('PayTotal3')}
                                                placeholder="0.00" />
                                        </div>
                                    </div> : ''}
                                    {payTypeIndex.indexOf(2) != -1 ? <div className="payType">
                                        <div className="left">
                                            <div className="pay_name">支付宝支付</div>
                                        </div>
                                        <div className="right">
                                            <InputItem
                                                type="money"
                                                {...getFieldProps('PayTotal2')}
                                                placeholder="0.00" />
                                        </div>
                                    </div> : ''}
                                    {payTypeIndex.indexOf(1) != -1 ? <div className="payType">
                                        <div className="left">
                                            <div className="pay_name">银行卡支付</div>
                                        </div>
                                        <div className="right">
                                            <InputItem
                                                type="money"
                                                {...getFieldProps('PayTotal1')}
                                                placeholder="0.00" />
                                        </div>
                                    </div> : ''}
                                </div>
                            </div>
                        </Item>
                        <Item
                            className="com"
                            extra={<div>
                                        <InputItem
                                        type="money"
                                            {...getFieldProps('PresentMoney',{
                                                })}
                                            placeholder="0.00" />
                                    </div>}
                        >
                            赠送金额
                        </Item>
                        <Item
                            className="com"
                            extra={<InputItem 
                                        type="number"
                                        {...getFieldProps('Bonus',{
                                                    initialValue: '0',
                                                })}
                                     placeholder="0" />
                                }
                        >
                            赠送积分
                        </Item>
                        
                        <Item>
                            <Button type="primary" onClick={this.onSubmit.bind(this)}>确认</Button>
                        </Item>
                    </List>
                </div> :
                <div className="refill_content">
                    <List>

                        <Item
                            extra={<div className="com" onClick={this.onChangeCard.bind(this,cardTypeIndex)}>{cardCodeName ? cardCodeName : '点击选择'}<Icon type="down" color="#108EE9" /></div>}
                        >卡号</Item>

                        <Item
                            extra={vipName}
                        >会员姓名</Item>



                        <Item>
                            <div>
                                <div className="refill_type">
                                    <div className="name">充值方式：</div>
                                    <div className="refill_lists">
                                        <div className={`refill_item ${payTypeIndex.indexOf(0) != -1 ? 'active' : ''}`} onClick={this.onPayType.bind(this,0)}>
                                            <div className="icon"></div>
                                            <div className="text">现金</div>
                                        </div>
                                        <div className={`refill_item ${payTypeIndex.indexOf(3) != -1 ? 'active' : ''}`} onClick={this.onPayType.bind(this,3)}>
                                            <div className="icon"></div>
                                            <div className="text">微信</div>
                                        </div>
                                        <div className={`refill_item ${payTypeIndex.indexOf(2) != -1 ? 'active' : ''}`} onClick={this.onPayType.bind(this,2)}>
                                            <div className="icon"></div>
                                            <div className="text">支付宝</div>
                                        </div>
                                        <div className={`refill_item ${payTypeIndex.indexOf(1) != -1 ? 'active' : ''}`} onClick={this.onPayType.bind(this,1)}>
                                            <div className="icon"></div>
                                            <div className="text">银行卡</div>
                                        </div>
                                    </div>
                                    {payTypeIndex.indexOf(0) != -1 ? <div className="payType">
                                        <div className="left">
                                            <div className="pay_name">现金支付</div>
                                        </div>
                                        <div className="right">
                                            <InputItem
                                                type="money"
                                                {...getFieldProps('PayTotal0')}
                                                placeholder="0.00" />
                                        </div>
                                    </div> : ''}
                                    {payTypeIndex.indexOf(3) != -1 ? <div className="payType">
                                        <div className="left">
                                            <div className="pay_name">微信支付</div>
                                        </div>
                                        <div className="right">
                                            <InputItem
                                                type="money"
                                                {...getFieldProps('PayTotal3')}
                                                placeholder="0.00" />
                                        </div>
                                    </div> : ''}
                                    {payTypeIndex.indexOf(2) != -1 ? <div className="payType">
                                        <div className="left">
                                            <div className="pay_name">支付宝支付</div>
                                        </div>
                                        <div className="right">
                                            <InputItem
                                                type="money"
                                                {...getFieldProps('PayTotal2')}
                                                placeholder="0.00" />
                                        </div>
                                    </div> : ''}
                                    {payTypeIndex.indexOf(1) != -1 ? <div className="payType">
                                        <div className="left">
                                            <div className="pay_name">银行卡支付</div>
                                        </div>
                                        <div className="right">
                                            <InputItem
                                                type="money"
                                                {...getFieldProps('PayTotal1')}
                                                placeholder="0.00" />
                                        </div>
                                    </div> : ''}
                                </div>
                            </div>
                        </Item>
                        <Item
                            className="com"
                            extra={<div>
                                        <InputItem
                                            type="number"
                                            {...getFieldProps('Meter',{
                                                    initialValue: '1',
                                                })}
                                            placeholder="1" />
                                    </div>}
                        >
                            充值次数
                        </Item>
                        <Item
                            className="com"
                            extra={<div className="com_extra" onClick={this.onChangeType.bind(this)}>{sellName ? sellName : '点击选择'}<Icon type="down" color="#108EE9" /></div>}
                        >
                            销售人员
                        </Item>

                        <Item>
                            <Button type="primary" onClick={this.onSubmit.bind(this)}>确认</Button>
                        </Item>
                    </List>
                </div>
        }


                <div className="submit_fixed"></div>
                <div className="submit">
                </div>
            </div>
        )
    }
}


export default createForm()(VipRefill)
