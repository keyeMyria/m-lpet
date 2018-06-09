import React from 'react';
import {List, InputItem, Icon, Toast, Popup, Modal} from 'antd-mobile';
import styles from './payType.less';

const Item = List.Item;
import {createForm} from 'rc-form';
import PopupModal from '../vip/popupModal';

const toNum = (str) => {
    const num = Number(str)
    return isNaN(num) ? 0 : num
}

class PayMain extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        payIndex: [],
        countMoney: 0,
        payMoney: 0,
    }
}

onSelect = (index) => {
    if(!this.props.vipList || (index == 4 && this.props.vipList.length ==0)){
        Toast.fail('当前会员没有会员卡,无法使用会员卡支付', 1)
        return
    }
    
    const {
        payIndex
    } = this.state;
    if (payIndex.indexOf(index) == -1) {
        payIndex.push(index)
        this.setState({
            payIndex
        })
    } else {
        payIndex.splice(payIndex.indexOf(index), 1)
        this.setState({
            payIndex
        })
    }
}

onChangeMoney = (key, value) => {
    const { form: {getFieldsValue}} = this.props;
    const fieldsValue = {...getFieldsValue(), [key]: value}
    const data = []
    for (const key in fieldsValue) {
        if (fieldsValue.hasOwnProperty(key)) {
            if(key.indexOf('PayTotal') == 0){
                data.push(fieldsValue[key])
            }
        }
    }
    const total = data.reduce((sum, value) => sum += toNum(value), 0)
    const cTotal = toNum(this.handleVipCardOff())
    this.setState({
        countMoney: total > cTotal ? total - cTotal : 0,
        payMoney: total > cTotal ? cTotal : total
    })
}

    /**
     * 选择、取消选择会员卡(会员卡折扣)
     * 1 仅参与打折商品可以进行会员折扣
     * 2 单品打折优先级最高，若有则不参与其他折扣
     * 3 若没有单品打折，会员价优先级最高， 不受最低影响, 且不再参与其他折扣
     * 4 会员卡折扣后， 低于最低价按最低价计， 高于最低价则按折扣价算
     */
  handleVipCardOff = () => {
    const currentCard = this.props.vipInitData
    const {payIndex} = this.state

    if(currentCard && currentCard.Id && this.props.typeActive == 2 && payIndex.indexOf(4) != -1){ //使用会员卡
        let currentTotalPrice = 0
        this.props.orderList.forEach(product=> {
            if(product.IsOff == 1){ //商品参与折扣
                const discountRate = Number(product.discountRate)
                if(!isNaN(discountRate) && discountRate != 10){ //有单品折扣
                    currentTotalPrice += Number(product.salePrice * product.addNumber * product.discountRate / 10.0)
                    product.discount = Number(product.salePrice * product.discountRate / 10.0)
                }else{ 
                    if(product.IsMemberPrice == '1' && product.MemberPrice != null){ //有会员价, 不打折
                        const memberPrice = Number(product.MemberPrice)
                        product.discount = product.MemberPrice
                        currentTotalPrice += (memberPrice * product.addNumber)
                    }else{ //没有单品折扣， 没有会员价， 进行会员卡打折
                       const {CardOffList} = this.props
                       let findOff = false
                       if((CardOffList instanceof Array) && CardOffList.length > 0){ //会员折扣设置折扣
                           const cardOff = CardOffList.find(item => item.CardTypeId == currentCard.cardTypeId && item.Con_Commodity_Mid == product.Id)
                           //是否有商品的折扣配置
                           if(cardOff){
                               const off = Number(cardOff.Off)
                               if(!isNaN(off)){ //折扣配置是否有效
                                   findOff = true
                                   let price = Number(product.SalePrice) * off / 10
                                   const minSalePrice = Number(product.MinSalePrice)
                                   if(!isNaN(minSalePrice)){ //最低价是否有效
                                       if(price < minSalePrice){  //低于最低价， 按最低价算
                                           price = minSalePrice
                                       }
                                   }
                                 
                                   product.discount = price
                                   product.Off = off
                                   currentTotalPrice += (price * product.addNumber)
                               }
                           }
                       }
                     
                       if(!findOff){ //没有折扣设置折扣， 进行会员卡类型折扣
                           const off = Number(currentCard.Off)
                            if(!isNaN(off)){
                                findOff = true
                                let price = Number(product.SalePrice) * off / 10
                                const minSalePrice = Number(product.MinSalePrice)
                                if(!isNaN(minSalePrice)){ //最低价是否有效
                                    if(price < minSalePrice){  //低于最低价， 按最低价算
                                        price = minSalePrice
                                    }
                                }

                                product.discount = price
                                product.Off = off
                                currentTotalPrice += (price * product.addNumber)
                            }
                        }

                        if(!findOff){ //没有会员折扣, 按原价计算
                            currentTotalPrice += (Number(product.SalePrice) * product.addNumber)
                        }
                    }
                }
            }else{
                // currentTotalPrice += (isNaN(Number(product.SalePrice)) ? 0 : Number(product.SalePrice)) 

                currentTotalPrice += ((isNaN(Number(product.SalePrice)) ? 0 : Number(product.SalePrice))) * product.Off / 10.0 * product.addNumber
            }
        })

        currentTotalPrice = Number(currentTotalPrice.toFixed(2))
        return currentTotalPrice
    }else{
        return Number(this.props.catTotal.toFixed(2))
    }
  }

    /**
     * 计算积分
     */
    onCalculateIntegral = (totalPayPrice)=>{
        const currentSelectVipCard = this.props.vipInitData
        let vipCount = 0
        if(currentSelectVipCard){
            const integralMoney = toNum(currentSelectVipCard.IntegralMoney)
            const integral = toNum(currentSelectVipCard.Integral)
            const totalPay = toNum(totalPayPrice)
            if(currentSelectVipCard.NotUsing == 1 && !isNaN(totalPay) && !isNaN(integralMoney) && !isNaN(integral)){
                if(currentSelectVipCard.UseCashBouns == 1){
                    vipCount = parseInt(totalPay / integralMoney) * integral
                }else{
                    const {PayTotal4, PayTotal41} = this.props.form.getFieldsValue()
                    vipCount = parseInt((toNum(PayTotal4) + toNum(PayTotal41)) / integralMoney) * integral
                }
            }
        }

        return toNum(vipCount)
    }

onDownOrder = () => {
    const {
        validateFields
    } = this.props.form;
    const {
        onSubmit,
        catTotal,
        vipInitData,
        vipList,
    } = this.props;
    const {
        payIndex
    } = this.state;
    const payName = ['现金支付', '银行卡支付', '支付宝支付', '微信支付', '会员卡', '', '', '押金']
    validateFields((error, value) => {

        let newData = [];
        var isCard = false;
        var isYee = false;
        var isZee = false;
        var isYajin = false;
        payIndex.forEach((data, index) => {
            if (payName[data] == '押金') {
                var depositMoney = Number(vipList.DepositMoney);
                var payTotal7 = value['PayTotal7'];
                if (payTotal7) {
                    payTotal7 = Number(payTotal7);
                } else {
                    payTotal7 = 0;
                }

                if (payTotal7 > depositMoney) {
                    isYajin = true;
                    return;
                }

                isYajin = 'yes';
            }

            if (payName[data] == '会员卡') {
                isCard = true;
                var yue = value['PayTotal4'];
                var zee = value['PayTotal41'];

                var Money = vipInitData.Money;
                var PresentMoney = vipInitData.PresentMoney;
                if (yue) {
                    yue = Number(yue);
                } else {
                    yue = 0;
                }
                if (yue > Money) {
                    isYee = true;
                    return;
                }
                if (zee) {
                    zee = Number(zee);
                } else {
                    zee = 0;
                }

                if (zee > PresentMoney) {
                    isZee = true;
                    return;
                }

                var count = yue + zee;
                newData.push({
                    Sys_Paytype_Mid: data,
                    Sys_Paytype_Name: payName[data],
                    PayTotal: count,
                    His_Card_Mid: data == 4 ? vipInitData.Id : '',
                    Sys_Subpaytype: {
                        "CardMoney": yue,
                        "PresentMoney": zee
                    }
                })

            } else if(payName[data] == '现金支付'){
                const countMoney = toNum(this.state.countMoney)
                let cash = toNum(value[`PayTotal${data}`])
                
                if(cash > countMoney){
                    cash = cash - countMoney
                }

                newData.push({
                    Sys_Paytype_Mid: data,
                    Sys_Paytype_Name: payName[data],
                    PayTotal:  cash
                })
            } else {
                newData.push({
                    Sys_Paytype_Mid: data,
                    Sys_Paytype_Name: payName[data],
                    PayTotal: value[`PayTotal${data}`] ? value[`PayTotal${data}`] : 0,
                    //His_Card_Mid:data == 4 ? vipInitData.Id : ''
                })

            }
        })

        if (isYee) {
            Toast.info('会员卡余额不足,请充值或选择其他支付方式', 0.8);
            return;
        }

        if (isZee) {
            Toast.info('会员卡赠额不足,请选择其他支付方式', 0.8);
            return;
        }

        if (isYajin == true) {
            Toast.info('押金不足,请选择其他支付方式', 0.8);
            return;
        }

        let total = 0;
        newData.forEach((data, index) => {
            let num = parseFloat(data.PayTotal ? data.PayTotal : 0)
            total += num
        })

        const cardOffTotal = this.handleVipCardOff()
        let info = {
            Sys_Paytypes: newData,
            Discription: value.Discription,
            ReMark: value.Discription,
            PayTotal: cardOffTotal,
            OffTotal: cardOffTotal,
        }

        if (isCard) {
            info.His_Card_Mid = vipInitData.Id;
        }

        if (isYajin == 'yes') {
            info.His_Consumer_Mid = vipList.His_Consumer_Mid;
        }

        const keys = ['1', '3', '2', '7'] //['Bank', 'Wechat', 'Zhi', 'Ya'] 
        const totalZhifu = keys.map(key=> {
            return toNum(value[`PayTotal${key}`])
        }).reduce((sum, value)=> sum + value, 0)
        const bankCash = toNum(value.PayTotal0)
        const bankYu = toNum(value.PayTotal4)
        const bankZhen = toNum(value.PayTotal41)
        const totalPayPrice = totalZhifu + bankCash + bankYu + bankZhen
        const totalPrice = this.handleVipCardOff()
        if((bankYu + bankZhen) > totalPrice || totalZhifu > totalPrice || (bankYu + bankZhen + totalZhifu) > totalPrice ||  totalPayPrice < totalPrice){
            Toast.info('支付金额不符，不能结算', 0.8)
            return
        }
        info.Bonus = this.onCalculateIntegral(totalPrice)

        const currentCard = this.props.vipInitData
        if(currentCard && currentCard.UsePassword == 1){
            Modal.prompt('输入支付密码', '', password => {
                if(password == currentCard.CardPassword){
                    onSubmit(info)
                    return true
                }else{
                    Toast.fail('支付密码不正确', 1.3)
                }
            }, 'secure-text')
        }else{
            onSubmit(info)
            return true
        }
    })
}


  onPopup() {
    const {vipList, changeSellName} = this.props;
    const popupProps = {
      title: '会员卡',
      dataList: vipList,
      onSubmit(id, name, index) {
        changeSellName(index)
        Popup.hide();
      },
      onClose() {
        Popup.hide();
      }
    }
    Popup.show(<div>
      <PopupModal {...popupProps}/>
    </div>, {animationType: 'slide-up'});
  }

  render() {
    const {getFieldProps} = this.props.form;
    const {typeActive, catNum, catTotal, vipInitData, vipList} = this.props;
    const {payIndex, countMoney} = this.state;
    return (
      <div className={styles.pay}>
        <div className="pay_header">
          <p>请选择支付方式</p>
          <div className="pay_content">
            <div className="pay_row">
              <div className={`pay_item ${payIndex.indexOf(0) != -1 ? 'active' : ''}`}
                   onClick={this.onSelect.bind(null, 0)}>
                <div className="pay_icon icon1"></div>
                <div className="pay_text">现金</div>
              </div>
              <div className={`pay_item ${payIndex.indexOf(3) != -1 ? 'active' : ''}`}
                   onClick={this.onSelect.bind(null, 3)}>
                <div className="pay_icon icon2"></div>
                <div className="pay_text">微信</div>
              </div>
              <div className={`pay_item ${payIndex.indexOf(2) != -1 ? 'active' : ''}`}
                   onClick={this.onSelect.bind(null, 2)}>
                <div className="pay_icon icon3"></div>
                <div className="pay_text">支付宝</div>
              </div>
            </div>

            <div className="pay_row">
              <div className={`pay_item ${payIndex.indexOf(1) != -1 ? 'active' : ''}`}
                   onClick={this.onSelect.bind(null, 1)}>
                <div className="pay_icon icon4"></div>
                <div className="pay_text">银行卡</div>
              </div>
              <div disabled="disabled"
                   className={`pay_item ${payIndex.indexOf(4) != -1 && typeActive == 2 ? 'active' : ''} ${(typeActive == 2 && (vipList.length!=0)) ? '' : 'disabled'}`}
                   onClick={(typeActive == 2) ? this.onSelect.bind(null, 4) : ''}>
                <div className="pay_icon icon5"></div>
                <div className="pay_text">会员卡</div>
              </div>
              <div
                className={`pay_item ${payIndex.indexOf(7) != -1 && typeActive == 2 ? 'active' : ''} ${(typeActive == 2 && (vipList.length!=0))? '' : 'disabled'}`}
                onClick={(typeActive == 2) ? this.onSelect.bind(null, 7) : ''}>
                <div className="pay_icon icon6"></div>
                <div className="pay_text">押金</div>
              </div>
            </div>
          </div>
        </div>

        <div className="pay_main">
          <List>
            {payIndex.indexOf(0) != -1 ? <Item
              extra={<InputItem
                type="money"
                placeholder='0.00'
                onBlur={this.onChangeMoney.bind(null, 'PayTotal0')}
                {...getFieldProps('PayTotal0',{
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
              />}
            >
              <h2>现金支付</h2>
              <p>实收现金 {toNum(this.state.payMoney).toFixed(2)} {`找零 ${toNum(countMoney).toFixed(2)}`}</p>
            </Item> : ''}

            {payIndex.indexOf(3) != -1 ? <Item
              extra={<InputItem
                type="money"
                placeholder='0.00'
                onBlur={this.onChangeMoney.bind(null, 'PayTotal3')}
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
              />}
            >
              <h2>微信支付</h2>
            </Item> : ''}
            {payIndex.indexOf(2) != -1 ? <Item
              extra={<InputItem
                type="money"
                placeholder='0.00'
                onBlur={this.onChangeMoney.bind(null, 'PayTotal2')}
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
              />}
            >
              <h2>支付宝支付</h2>
            </Item> : ''}
            {payIndex.indexOf(1) != -1 ? <Item
              extra={<InputItem
                type="money"
                placeholder='0.00'
                onBlur={this.onChangeMoney.bind(null, 'PayTotal1')}
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
              />}
            >
              <h2>银行卡支付</h2>
            </Item> : ''}
            {payIndex.indexOf(4) != -1 && typeActive == 2 ?
              <div>
                <Item
                  className="huiyuan"
                  extra={<div
                    onClick={this.onPopup.bind(this)}>{`${vipInitData.CardType ? vipInitData.CardType : ''}  ${vipInitData.Code ? vipInitData.Code : ''}`}<Icon
                    type="down" color="#108EE9"/></div>}
                >
                  <h2>会员卡</h2>
                </Item>
                <Item
                  className="pay_huiyuan"
                  extra={<InputItem
                    placeholder='0.00'
                    onBlur={this.onChangeMoney.bind(null, 'PayTotal4')}
                    {...getFieldProps('PayTotal4',{
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
                    type="money"
                  />}
                >
                  <h2>余额支付</h2>
                  <p className="presentMoney">当前余额 {vipInitData.Money}</p>
                  {/*<p>当前余额 1000.00  结算后余额 910.00</p>*/}
                </Item>
                <Item
                  className="pay_huiyuan"
                  extra={<InputItem
                    placeholder='0.00'
                    onBlur={this.onChangeMoney.bind(null, 'PayTotal41')}
                    {...getFieldProps('PayTotal41',{
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
                    type="money"
                  />}
                >
                  <h2>赠额支付</h2>
                  <p className="presentMoney">当前赠额 {vipInitData.PresentMoney}</p>
                  {/*<p>当前赠额 0.00</p>*/}
                </Item>
              </div>
              : ''}

            {payIndex.indexOf(7) != -1 && typeActive == 2 ? <Item
              extra={<InputItem
                    placeholder='0.00'
                    onBlur={this.onChangeMoney.bind(null, 'PayTotal7')}
                {...getFieldProps('PayTotal7',{
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
              />}
            >
              <h2>押金支付</h2>
            </Item> : ''}
            <Item>
                <InputItem
                  placeholder="请输入备注"
                  {...getFieldProps('Discription')}
                ><h2>备注</h2></InputItem>
            </Item>
          </List>
        </div>
        <div>
          <div className={styles.normal}>
            <div className="left">
                <div className="icon">
                  合计：
                </div>
                <h2>￥{toNum(this.handleVipCardOff()).toFixed(2)}</h2> 
            </div>
            <div className={`right ${catNum < 0 ? '' : 'active'}`} onClick={catNum == 0 ? '' : this.onDownOrder}>
              完成
            </div>
          </div>
          <div className={styles.footer}></div>
        </div>
      </div>
    )
  }
}


export default createForm()(PayMain)
