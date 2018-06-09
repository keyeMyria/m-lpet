import React from 'react';
import {Button,Icon,DatePicker,List,Picker,Popup,InputItem,Toast,Modal} from 'antd-mobile';
import { Link } from 'dva/router'
import styles from './addBill.less';
import PopupModal1 from '../vip/popupModal1';
import PopupModal from './popupModal';
const Item = List.Item;
import moment from 'moment';
import { createForm } from 'rc-form';
const alert = Modal.alert;


const CustomChildren = props => (
    <div
        onClick={props.onClick}
        className="time_content"
    >
        {props.children}
        <div>
            {props.extra}
            <div className="time"></div>
        </div>
    </div>
);



const end = moment();

class AddBillMain extends React.Component{

    constructor(props){
        super(props);
        this.state = {
           cardTypeIndex:1,
           payTypeIndex:[0],
           dateValue:end,
           useName:"",
           useId:"",
           money:'100',
           countMoney:'',//计算金额
           Usage:'',//用途
        }

    }

    onCardType(index){
        this.setState({
            cardTypeIndex:index
        })
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

    onDatePicker(value) {
        //时间
        this.setState({
            dateValue:value
        })
    }

    onChangeType(){
        const {employeeList} = this.props;
        const self = this;
        const popupProps = {
            title:'操作人员',
            dataList:employeeList,
            onSubmit(id,name){
                self.setState({
                    useName:name,
                    useId:id
                })
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

   toDecimal2(x){
    var f = parseFloat(x);
    if (isNaN(f)) {
      return 0;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
  }

    onSubmit(){
        const {validateFields} = this.props.form;
        const {onSubmit,addCode,outCode} = this.props;
        const {cardTypeIndex,dateValue,payTypeIndex,useId,Usage} = this.state;
        const payName = ['现金支付','银行卡支付','支付宝支付','微信支付','会员卡','','押金支付']
        validateFields((error,value) => {
            let newData = []
            payTypeIndex.forEach((data,index) => {
                newData.push({
                    Sys_Paytype_Mid:data,
                    Sys_Paytype_Name:payName[data],
                    PayTotal:this.toDecimal2(value[`PayTotal${data}`]),
                })
            })
            if(!Usage || Usage.trim() == ''){
				Toast.info('请输入用途',0.8)
				return false
			}else if(!useId){
				Toast.info('请选择操作人员',0.8)
				return false
			}
            let total = 0;
            newData.forEach((data,index) => {
               let num = parseFloat(data.PayTotal  ? data.PayTotal : 0)
               total += num
            })

            if(total <= 0){
                Toast.info('请输入收支金额',0.8)
                return false
            }

            const info = {
                ...value,
                Sys_Paytypes:newData,
                OrderID:cardTypeIndex == 1 ? addCode : outCode,
                HappenTime:moment(dateValue).format('YYYY-MM-DD'),
                ChargeType:cardTypeIndex == 1 ? '0' : '1',
                PayType:payTypeIndex,
                Creator:useId,
                Usage,
                OperateMoney:this.toDecimal2(total)
            }
            alert('提示', `收支总额：${this.toDecimal2(total)}`, [{ text: '取消'},{ text: '确定',onPress:() => onSubmit(info)}])
            // onSubmit(info)
        })
    }

    changeMoney(value){
        this.setState({
            money:value
        })
    }

    countMoney(value){
        const {money} = this.state;
        if(value - money >= 0){
            this.setState({
                countMoney:value - money
            })
        }else{
            this.setState({
                countMoney:''
            })
        }
    }

    onUsage(){
        const {historyList} = this.props;
        const self = this;
        const popupProps = {
            title:'历史用途',
            dataList:historyList,
            onSubmit(Usage){
                self.setState({
                    Usage:Usage,
                })
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

    onInputChange(value){
        this.setState({
            Usage:value,
        })
    }

  changeInputMoney (value){
    return value
  }

    render(){
        const {cardTypeIndex,payTypeIndex,dateValue,useName,money,countMoney,Usage} = this.state;
        const {getFieldProps} = this.props.form;
        const {outCode,addCode} = this.props;
        return (
            <div className={styles.addBill}>
                <div className="card_type">
                    <p>请选择收支类型</p>
                    <div className="type_content">
                        <div
                            onClick={this.onCardType.bind(this,1)}
                            className={`card_item card1 ${cardTypeIndex == 1 ? 'active' : ''}`}>
                            <div className="icon"></div>
                            <div className="text">收入单</div>
                        </div>
                        <div
                            onClick={this.onCardType.bind(this,2)}
                            className={`card_item card2 ${cardTypeIndex == 2 ? 'active' : ''}`}>
                            <div className="icon"></div>
                            <div className="text">支出单</div>
                        </div>
                    </div>
                </div>

                <List>

                        <Item
                            extra={cardTypeIndex == 1 ? addCode : outCode}
                        >编号</Item>
                        <Item>
                            <DatePicker
                                    mode="date"
                                    title="选择日期"
                                    extra="点击选择"
                                    value={dateValue}
                                    onChange={this.onDatePicker.bind(this)}
                                >
                                    <CustomChildren>时间</CustomChildren>
                            </DatePicker>
                        </Item>

                        {/*<Item
                            className="com"
                            extra={<div className="com_extra" onClick={this.onChangeType.bind(this)}>{useName ? useName : '点击选择'}<Icon type="down" color="#108EE9" /></div>}
                        >
                            用途
                        </Item>*/}
                        <InputItem
                            placeholder="点击输入"
                            extra={<div className="com" onClick={this.onUsage.bind(this)}><Icon type="down" color="#108EE9" /></div>}
                            {...getFieldProps('Usage')}
                            value={Usage}
                            onChange={this.onInputChange.bind(this)}
                        >
                            用途
                        </InputItem>

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
                                    {payTypeIndex.indexOf(0) != -1 ? <div className="payCashType">
                                            <div className="pay_name">现金支付</div>
                                            <InputItem 
                                                style={{width: 280}}
                                                type="money"
                                                onBlur={this.countMoney.bind(this)}
                                                {...getFieldProps('PayTotal0', {
                                                    normalize: (v, prev) => {
                                                        if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                                                          if (v === '.') {
                                                            return '0.';
                                                          }
                                                          return prev;
                                                        }
                                                        return v;
                                                      },
                                                })}
                                                moneyKeyboardAlign="left"
                                               /* onChange={this.changeInputMoney.bind(this)}*/
                                                placeholder="0.00" />
                                    </div> : ''}
                                    {payTypeIndex.indexOf(3) != -1 ? <div className="payCashType">
                                            <div className="pay_name">微信支付</div>
                                            <InputItem style={{width: 280}}
                                                type="money"
                                                {...getFieldProps('PayTotal3',{
                                                    normalize: (v, prev) => {
                                                        if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                                                          if (v === '.') {
                                                            return '0.';
                                                          }
                                                          return prev;
                                                        }
                                                        return v;
                                                      },
                                                })}
                                                moneyKeyboardAlign="left"
                                                placeholder="0.00" />
                                    </div> : ''}
                                    {payTypeIndex.indexOf(2) != -1 ? <div className="payCashType">
                                            <div className="pay_name">支付宝支付</div>
                                            <InputItem style={{width: 280}}
                                                type="money"
                                                {...getFieldProps('PayTotal2',{
                                                    normalize: (v, prev) => {
                                                        if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                                                          if (v === '.') {
                                                            return '0.';
                                                          }
                                                          return prev;
                                                        }
                                                        return v;
                                                      },
                                                })}
                                                moneyKeyboardAlign="left"
                                                placeholder="0.00" />
                                    </div> : ''}
                                    {payTypeIndex.indexOf(1) != -1 ? <div className="payCashType">
                                            <div className="pay_name">银行卡支付</div>
                                            <InputItem style={{width: 280}}
                                                type="money"
                                                {...getFieldProps('PayTotal1',{
                                                    normalize: (v, prev) => {
                                                        if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                                                          if (v === '.') {
                                                            return '0.';
                                                          }
                                                          return prev;
                                                        }
                                                        return v;
                                                      },
                                                })}
                                                moneyKeyboardAlign="left"
                                                placeholder="0.00" />
                                    </div> : ''}
                                </div>
                            </div>
                        </Item>

                        <Item
                            className="com"
                            extra={<div className="com_extra" onClick={this.onChangeType.bind(this)}>{useName ? useName : '点击选择'}<Icon type="down" color="#108EE9" /></div>}
                        >
                            操作人员
                        </Item>
                        <InputItem
                            placeholder="点击输入"
                            {...getFieldProps('Discription')}
                        >
                            备注
                        </InputItem>
                    </List>

                    <div className="submit_fixed"></div>
                    <div className="submit">
                        <Button type="primary" onClick={this.onSubmit.bind(this)}>确认</Button>
                    </div>
            </div>
        )
    }
}


export default createForm()(AddBillMain)
