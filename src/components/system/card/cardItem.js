import React from 'react';
import styles from './cardItem.less';
import { List, InputItem, Checkbox ,Modal} from 'antd-mobile'
const alert = Modal.alert;


class CarItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    onChangeTip = () => {
        alert('折扣说明',<div className="explain">如果您需要对会员卡的折扣进行更详细的设置，请保存完毕后，去系统设置-折扣设置进行管理</div>,[{text:'知道了'}])
    }


    onDelete = (index) => {
        const {cardData} = this.props;        
        alert('提醒',<div className="alert-delete"><div>确定要删除会员卡“Card {index+1 < 10 ? `0${index+1}` : index+1}”吗？</div><div>删除后，卡片信息将不存在</div></div>,[{text:'取消'},{text:'删除',onPress:cardData.onDelete.bind(index)}])
        
    }

    onVipCardName = (value) => {
        const {cardData} = this.props;
        cardData.onChangeCardData(cardData.index,'vipCardName',value)
    }

    onDiscount = (value) => {
        const {cardData} = this.props;
        cardData.onChangeCardData(cardData.index,'discount',value)        
    }

    onChangeCheck = (e) => {
        const {cardData} = this.props;
        cardData.onChangeCardData(cardData.index,'switchStatus',e.target.checked)  
    }

    render() {
        const {cardData} = this.props;

        return (
            <div className={styles.cardItem}>
                <div className="card-header">
                    <img src={require('../../../assets/icon_huiyuanka_small2x.png')} alt="" />
                    <span>Card{cardData.index+1 < 10 ? `0${cardData.index+1}` : cardData.index+1}</span>
                    <div className="delete" onClick={this.onDelete.bind(null,cardData.index)}>
                        <img src={require('../../../assets/icon_shanchu_baise2x.png')} alt="" />
                    </div>
                </div>
                <div className="card-content">
                    <List>
                        <InputItem
                            value={cardData.vipCardName}
                            onChange={this.onVipCardName}
                            type="text"
                            clear
                            placeholder="请输入会员卡类型名称"
                        >
                            会员卡名：
                        </InputItem>
                        <InputItem
                            value={cardData.discount}
                            onChange={this.onDiscount}
                            type="number"
                            placeholder="请输入1-10的数字"
                            clear
                            extra={
                                <div><span>折</span><img src={require('../../../assets/icon_tips4@2x.png')} onClick={this.onChangeTip} /></div>
                            }
                        >
                            通用折扣：
                        </InputItem>
                        <List.Item>
                            <Checkbox checked={cardData.switchStatus} onChange={this.onChangeCheck}/><span>开启会员卡消费积分</span>
                        </List.Item>
                    </List>
                </div>
            </div>
        )
    }
}


export default CarItem