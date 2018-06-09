import React from 'react';
import {Button, List, InputItem, ImagePicker, Icon, Popup, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import styles from './addCommodity.less';
import PopupModal from '../manage/popupModal'
import PopupMoreModal from '../manage/popupMoreModal'
import Pinyin from '../../utils/pinyin'
import PopupCommission from '../manage/commission/PopupCommission'

const pinyin = new Pinyin()
pinyin.setOptions({checkPolyphone: false, charCase: 0});
const Item = List.Item;


class AddManageListMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      companys: [],
      ServiceCommissionMoney: undefined,
      ServiceCommissionType: 0,
      SaleCommissionMoney: undefined,
      SaleCommissionType: 0,
    }

  }


  onChange(files, type, index) {
    this.setState({
      files,
    });
  }

  onChangeType() {
    const {commoditysClass, submitName} = this.props;
    const popupProps = {
      title: '商品分类',
      dataList: commoditysClass,
      onSubmit(id, name) {
        submitName(id, name)
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

  onChangeCom() {
    const {submitComCard, companys} = this.props;
    var obj = this;
    const popupProps = {
      title: '供应商',
      dataList: companys,
      onSubmit(companys) {
        var arr = [];
        var arr2 = [];
        if (companys.length > 0) {
          companys.forEach(item => {
            arr.push(item.G_Company_Mid)
            arr2.push(item.G_Company_Name)
          })
        }
        var name = arr2.join(',');
        var id = arr.join(',');
        obj.setState({
          companys: companys
        });
        submitComCard(id, name, companys)
        Popup.hide();
      },
      onClose() {
        Popup.hide();
      }
    }
    Popup.show(<div>
      <PopupMoreModal {...popupProps}/>
    </div>, {animationType: 'slide-up'});
  }

  onSaleCommissionChange() {
    this.handleChangeCommission('Sale', '销售提成', this.state.SaleCommissionType, this.state.SaleCommissionMoney) 
 }

 onServiceCommissionChange() {
    this.handleChangeCommission('Service', '服务提成', this.state.ServiceCommissionType, this.state.ServiceCommissionMoney) 
 }

 handleChangeCommission(key, title, type, value) {
     var obj = this;
     const { submitComCard } = this.props;

     const popupProps = {
         title,
         type,
         value,
         onSubmit(data) {
             obj.setState({
                 [`${key}CommissionMoney`]: data.value,
                 [`${key}CommissionType`]: data.type,
             })
             Popup.hide();
         },
         onClose() {
             Popup.hide();
         }
     };

     Popup.show(<PopupCommission {...popupProps} />);
 }

  onSubmit() {
    const {validateFields} = this.props.form;
    const {onSubmit} = this.props;
    const {files, companys} = this.state;
    validateFields((error, value) => {
        var name = value.Name;
        var namePy = ''
        if (name && name.length > 0) {
          namePy = pinyin.getCamelChars(name)
        }

        value.NamePy = namePy;
        value.Company = companys;
        value.IsStock = '1';
        value.ServiceCommissionMoney = this.state.ServiceCommissionMoney,
        value.ServiceCommissionType = this.state.ServiceCommissionType,
        value.SaleCommissionMoney = this.state.SaleCommissionMoney,
        value.SaleCommissionType = this.state.SaleCommissionType

        if(value.MemberPrice > 0){
          value.IsMemberPrice = '1'
        }

        if (files instanceof Array && files.length > 0 && files[0].file && files[0].file.size < 100000) {
          const formdata = new FormData();
          formdata.append('file-demo', files[0].file);
          onSubmit(value, formdata)
          return
        } else {
          Toast.info('图片大小不能超过100KB', 0.8)
        }
        onSubmit(value)
    })
  }

  getCommission(type, value){
    const num = Number(value)
    let valueNum = isNaN(num) ? 0 : num
    return `${type == 0 ? valueNum.toFixed(2) : valueNum}${type == 0 ? '¥' : '%'}`
  }

  onGetCode(){
    const {saveQRCode} = this.props;
    window.wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success (res) {
                const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                var data = '';
                if(result.indexOf(',') == -1){
                    data = result;
                }else{
                    data = result.split(',')[1]
                }
                saveQRCode(data)
            }
      })
}

  render() {
    const {files, companys} = this.state;
    const {getFieldProps} = this.props.form;
    const {commodityName, leftData,QRCode} = this.props;
    var companyName = [];
    if (companys.length > 0) {
      companys.forEach(item => {
        companyName.push(item.G_Company_Name)
      })
    }
    companyName = companyName.join(',')
    return (
      <div className={styles.addManageListMain}>
        <div className="card_type">
          <div className="type_content">
            {/* {leftData.name == '商品' ? <div
                className={`card_item card1 active`}>
                <div className="icon"></div>
                <div className="text">商品类</div>
              </div> :
              <div
                className={`card_item card2 active`}>
                <div className="icon"></div>
                <div className="text">服务类</div>
              </div>} */}
              <div
                className={`card_item card2 active`}>
                <div className="icon"></div>
                <div className="text">{leftData.name}</div>
              </div>
          </div>
        </div>


        <div className="manage_list">
          <List>
            <InputItem
              placeholder="输入条码"
              extra={
                <div
                    className="com"
                    onClick={this.onGetCode.bind(this)}
                >
                    <img src={require('../../assets/searchCode.png')} />
                </div>
            }
              {...getFieldProps('EnCode', {
                initialValue: QRCode,
                normalize: (v, prev) => {
                  if (v && v.replace(/\s+/g, "")) {
                    return v;
                  } else {
                    return '';
                  }

                }
              })}
            >
              条码
            </InputItem>
            <InputItem
              placeholder="点击输入"
              {...getFieldProps('Name', {
                normalize: (v, prev) => {
                  if (v && v.replace(/\s+/g, "")) {
                    return v;
                  } else {
                    return '';
                  }

                }
              })}
              className="must"
            >
              商品名称
            </InputItem>
            <Item
              className="must"
              extra={<div className="com"
                          onClick={this.onChangeType.bind(this)}>{commodityName.name ? commodityName.name : '点击选择'}<Icon
                type="down" color="#108EE9"/></div>}
            >
              商品分类
            </Item>
            <InputItem
              placeholder="点击输入"
              {...getFieldProps('Format', {
                normalize: (v, prev) => {
                  if (v && v.replace(/\s+/g, "")) {
                    return v;
                  } else {
                    return '';
                  }

                }
              })}
            >
              商品规格
            </InputItem>
            <InputItem
              placeholder="点击输入"
              {...getFieldProps('Unit', {
                normalize: (v, prev) => {
                  if (v && v.replace(/\s+/g, "")) {
                    return v;
                  } else {
                    return '';
                  }

                }
              })}
            >
              商品单位
            </InputItem>
            <InputItem
              type='money'
              placeholder="￥0.00"
              {...getFieldProps('BuyPrice')}
            >
              商品进价
            </InputItem>
            <InputItem
              type='money'
              placeholder="￥0.00"
              {...getFieldProps('SalePrice')}
            >
              商品单价
            </InputItem>
            <InputItem
              type='money'
              placeholder="￥0.00"
              {...getFieldProps('MemberPrice')}
            >
              会员价
            </InputItem>
            <Item
                extra={
                    <div
                        className="com"
                        onClick={this.onServiceCommissionChange.bind(this)}
                    >
                        {this.state.ServiceCommissionType == undefined ? '点击输入' : this.getCommission(this.state.ServiceCommissionType, this.state.ServiceCommissionMoney)}
                        <Icon type="down" color="#108EE9" />
                    </div>
                }
            >
                服务提成
            </Item>
            <Item
                extra={
                    <div
                        className="com"
                        onClick={this.onSaleCommissionChange.bind(this)}
                    >
                        {this.state.SaleCommissionType == undefined ? '点击输入' : this.getCommission(this.state.SaleCommissionType, this.state.SaleCommissionMoney)}
                        <Icon type="down" color="#108EE9" />
                    </div>
                }
            >
                销售提成
            </Item>
            {/* <InputItem
              type='money'
              placeholder="￥0.00"
              {...getFieldProps('ServiceCommissionMoney')}
            >
              服务提成
            </InputItem>
            <InputItem
              type='money'
              placeholder="￥0.00"
              {...getFieldProps('SaleCommissionMoney')}
            >
              销售提成
            </InputItem> */}
            <InputItem
              placeholder="0"
              type="money"
              {...getFieldProps('Number')}
            >
              库存
            </InputItem>
            <Item
              extra={<div className="com"
                          onClick={this.onChangeCom.bind(this)}>{companyName ? companyName : '点击选择'}<Icon
                type="down" color="#108EE9"/></div>}
            >
              供应商
            </Item>
            <InputItem
              placeholder="点击输入"
              {...getFieldProps('Discription', {
                normalize: (v, prev) => {
                  if (v && v.replace(/\s+/g, "")) {
                    return v;
                  } else {
                    return '';
                  }

                }
              })}
            >
              备注
            </InputItem>
            <Item>
              <div>
                <div>上传图片</div>
                <div>
                  <ImagePicker
                    files={files}
                    onChange={this.onChange.bind(this)}
                    selectable={files.length < 1}
                  />
                </div>
              </div>
            </Item>
          </List>
        </div>

        <div className="hint">
          <div className="hint_icon"></div>
          <div className="hint_text">更多商品信息请于电脑客户端完善</div>
        </div>
        <div className="submit_fixed"></div>
        <div className="submit">
          <Button type="primary" onClick={this.onSubmit.bind(this)}>完成</Button>
        </div>
      </div>
    )
  }
}


export default createForm()(AddManageListMain)
