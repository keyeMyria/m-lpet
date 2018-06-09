import React from 'react';
import {Button,Icon,List,InputItem,Checkbox,DatePicker,Popup,Toast} from 'antd-mobile';
import { Link } from 'dva/router'
import styles from './addMake.less';
const Item = List.Item;
import { createForm } from 'rc-form';
import PopupModal from '../vip/popupModal1';
import moment from 'moment';
const DateValue = moment().format('YYYY-MM-DD HH:mm:ss');





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


class AddMakeMain extends React.Component{

    constructor(props){
        super(props);
        this.state = {
           start:moment(),
           type:'0',
           typeName:'美容洗澡',
           isWeixin:false,
           isSms:false
        }

    }


    onChangeType(){
        const self = this;
        const popupProps = {
            title:'预约类型',
            dataList:[{Id:0,Name:'美容洗澡'},{Id:1,Name:'寄养服务'},{Id:2,Name:'其他预约'}],
            onSubmit(id,name){
                self.setState({
                    type:id,
                    typeName:name
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

    startTime(value){
        this.setState({
            start:value
        })
    }

    getVipData(){
        const {getVipData} = this.props;
        getVipData()
    }


    onSubmit(){
        const {validateFields} = this.props.form;
        const {type,start} = this.state;
        const {onSubmit,vipData = {}} = this.props;
        validateFields((error,value) => {
          if(!value.His_Consumer_Name || value.His_Consumer_Name.trim() == ''){
            Toast.fail('请输入会员姓名!', 0.8)
            return;
          }

          if(!value.His_Consumer_Phone || value.His_Consumer_Phone.trim() == ''){
            Toast.fail('请输入联系方式!', 0.8)
            return;
          }

            const info = {
                ...value,
                His_Consumer_Phone:value.His_Consumer_Phone.replace(/\s/g,''),
                AppointmentType:type,
                AppointmentTime:moment(start).format('YYYY-MM-DD HH:mm'),
                IsAutoSmsNotify:this.state.isSms,
                IsAutoWeixingNotify:this.state.isWeixin,
                His_Consumer_Mid:vipData.Id
            }
            onSubmit(info);
        })
    }

  setSms () {
    this.setState({
      isSms:!this.state.isSms
    })
  }

  setWeixin () {
    this.setState({
      isWeixin:!this.state.isWeixin
    })
  }

    render(){
        const {start,typeName} = this.state;
        const {getFieldProps} = this.props.form;
        const {vipData = {}} = this.props;
        return (
            <div className={styles.addMakeMain}>
                <List>
                    <Item
                        extra={DateValue}
                    >
                        创建时间
                    </Item>
                    <InputItem
                        placeholder="请输入会员姓名"
                        extra={<div onClick={this.getVipData.bind(this)}><img src={require("../../assets/guke.png")} alt=""/></div>}
                        {...getFieldProps('His_Consumer_Name',{
                            initialValue: vipData.Name,
                        })}
                    >
                        顾客姓名
                    </InputItem>
                    <InputItem
                        placeholder="请输入联系方式"
                        type="phone"
                        {...getFieldProps('His_Consumer_Phone',{
                            initialValue: vipData.Mobile,
                        })}
                    >
                        联系方式
                    </InputItem>
                    <InputItem
                        placeholder="请输入宠物姓名"
                        {...getFieldProps('His_Pet_Name',{
                            initialValue: vipData.consumerPetInfo ? vipData.consumerPetInfo[0].Name : '',
                        })}
                    >
                        宠物姓名
                    </InputItem>
                    <Item
                        extra={<div className="com" onClick={this.onChangeType.bind(this)}>{typeName ? typeName : '点击选择'}<Icon type="down" color="#108EE9" /></div>}
                    >
                        预约类型
                    </Item>
                    <Item>
                        <DatePicker
                            mode="datetime"
                            title="选择开始日期"
                            format={val => val.format('YYYY-MM-DD HH:mm')}
                            value={start}
                            onChange={this.startTime.bind(this)}
                            >
                            <CustomChildren>预约时间</CustomChildren>
                        </DatePicker>
                    </Item>

                    <InputItem
                        placeholder="点击输入"
                        {...getFieldProps('Discription')}
                    >
                        备注
                    </InputItem>
                </List>

                <div className="hint">
                    <Checkbox checked={this.state.isSms} onChange={this.setSms.bind(this)}>到期自动微信提醒顾客</Checkbox>
                    <Checkbox checked={this.state.isWeixin} onChange={this.setWeixin.bind(this)}>到期自动短信提醒顾客</Checkbox>
                </div>

                <div className="submit_fixed"></div>
                <div className="submit">
                    <Button type="primary" onClick={this.onSubmit.bind(this)}>确认</Button>
                </div>
            </div>
        )
    }
}


export default createForm()(AddMakeMain)
