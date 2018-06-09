import React from 'react';
import { List,Button,InputItem,Checkbox,Icon,Popup,DatePicker, Toast} from 'antd-mobile';
import styles from './vipCard.less';
const Item = List.Item;
import { createForm } from 'rc-form';
import PopupModal from '../tally/popupModal';





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


class VipCardMain extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            cardTypeIndex:1,
            upCardActive:false,
            dateTime:new Date(),
            checked:false
        }

    }

    onCardType(index){
        this.setState({
            cardTypeIndex:index
        })
        this.props.submitCard({
            type:'vip/saveCardType',
            payload:{id: '',name: ''}
        })
        this.props.form.setFieldsValue({bankCard: ''})
    }

    onUpCard(){
        this.setState({
            upCardActive:!this.state.upCardActive
        })
    }

    onChangeType(){
        const {cardTypeList, meterCardTypeList, submitCard} = this.props;
        const popupProps = {
            title:'卡类型',
            dataList: this.state.cardTypeIndex == 1 ? cardTypeList : meterCardTypeList,
            onSubmit(id,name){
                submitCard(id,name)
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

    onDatePicker(value){
        const {changDateName} = this.props;
        changDateName(value)
    }

    getDate(){
        Date.prototype.Format = function (fmt) { //author: meizz 
            var o = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        //获取系统当前时间
        const myDate = this.state.dateTime.Format("yyyy-MM-dd hh:mm:ss"); ;
        
        return myDate;
    }

    onSubmit(){
        const {validateFields} = this.props.form;
        const {onAddVipCard} = this.props;
        const {cardTypeIndex,checked} = this.state;
        validateFields((error,value) => {
            const {CardCode, Code, CardPassword} = value
            if(!this.props.cardTypeName || this.props.cardTypeName.trim() == ''){
                Toast.fail('请选择卡类型!', 0.8)
                return
            }

            if(cardTypeIndex ==1 && (!CardCode|| CardCode.trim() == '')){
                Toast.fail('请输入卡号!', 0.8) 
                return
            }

            if(cardTypeIndex == 2 && (!Code || Code.trim() == '')){
                Toast.fail('请输入卡号!', 0.8) 
                return
            }

            if(this.state.checked && (!CardPassword || CardPassword == '')){
                Toast.fail('请输入密码!', 0.8) 
                return
            }

            const info = {
                ...value,
                CardPassword: checked ? value.CardPassword : '',
                UsePassword: checked
            }
            onAddVipCard(cardTypeIndex,info)
        })
    }

    onCheckChange(e){
        this.setState({
            checked:e.target.checked
        })
    }

    render(){
        const {cardTypeIndex,upCardActive,checked} = this.state;
        const { getFieldProps } = this.props.form;
        const {cardTypeName,dateName} = this.props;
        return (
            <div className={styles.vipCardMain}>
                <div className="card_type">
                    <p>请选择办卡类型</p>
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
                
                { cardTypeIndex == 1 ? <div className="card_content">
                    <List>
                        <Item 
                            extra={this.getDate()}
                        >
                        发卡时间
                        </Item>
                        <Item 
                            extra={<div className="com" onClick={this.onChangeType.bind(this)}>{cardTypeName ? cardTypeName : '点击选择'}<Icon type="down" color="#108EE9" /></div>}
                        >
                        卡类型
                        </Item>
                        <InputItem 
                            placeholder="点击输入"
                            type="bankCard"
                            {...getFieldProps('CardCode')}
                        >
                        卡号
                        </InputItem>
                        <InputItem 
                            placeholder="点击输入"
                            type="password"
                            disabled={!checked}
                            {...getFieldProps('CardPassword')}
                        >
                            <Checkbox
                                onChange={this.onCheckChange.bind(this)}
                            >使用密码</Checkbox>
                        </InputItem>
                    </List>
                    <div className="reapply_content">
                        <div className="reapply_card">
                            <div className="card_header">
                                <div className="left">补录卡余额</div>
                                <div 
                                    className={`right ${upCardActive ? 'active' : ''}`}
                                    onClick={this.onUpCard.bind(this)}
                                    ></div>
                            </div>

                            {upCardActive ? <div className="card_lists">
                                <List>
                                    <Item
                                        extra={<div className="num"><InputItem placeholder="0" type="number" {...getFieldProps('Money')} /></div>}
                                    >卡余额</Item>
                                    <Item
                                        extra={<div className="num"><InputItem placeholder="0" type="number" {...getFieldProps('PresentMoney')} /></div>}
                                    >卡赠额</Item>
                                    <Item
                                        extra={<div className="num"><InputItem placeholder="0" type="number" {...getFieldProps('Bonus')} /></div>}
                                    >卡积分</Item>
                                </List>
                            </div> : ''}

                        </div>
                    </div>


                    <div className="hint">
                        <div className="hint_icon"></div>
                        <div className="hint_text">补录卡余额仅针对使用系统前已经发卡的用户，可将当前卡余额补录进</div>
                    </div>
                    
                </div> : 
                <div className="card_content">
                    <List>
                        <Item 
                            extra={this.getDate()}
                        >
                            发卡时间
                        </Item>

                        <Item 
                            extra={<div className="com" onClick={this.onChangeType.bind(this)}>{cardTypeName ? cardTypeName : '点击选择'}<Icon type="down" color="#108EE9" /></div>}
                        >
                            卡类型
                        </Item>

                        <InputItem 
                            placeholder="点击输入"
                            type="bankCard"
                            {...getFieldProps('Code')}
                        >
                        卡号
                        </InputItem>

                        <DatePicker
                            mode="date"
                            title="选择日期"
                            value={dateName}
                            extra="点击选择"
                            onChange={this.onDatePicker.bind(this)}
                            >
                                <CustomChildren>有效期</CustomChildren>
                        </DatePicker>
                        
                    </List>
                </div>
        }

                
                
                <div className="submit_fixed"></div>
                <div className="submit">
                    <Button type="primary" onClick={this.onSubmit.bind(this)}>确认</Button>
                </div>
                
            </div>
        )
    }
}


export default createForm()(VipCardMain)