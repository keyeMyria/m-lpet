import React from 'react';
import styles from './cardItem.less';
import { List, InputItem ,Modal} from 'antd-mobile'
const alert = Modal.alert;


class CarItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }




    onDelete = (index) => {
        const {cardData} = this.props;        
        alert('提醒',<div className="alert-delete"><div>确定要删除次卡“Card {index+1 < 10 ? `0${index+1}` : index+1}”吗？</div><div>删除后，卡片信息将不存在</div></div>,[{text:'取消'},{text:'删除',onPress:cardData.onDelete.bind(index)}])
        
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
                    <img src={require('../../../assets/icon_cika_small2x.png')} alt="" />
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
                            placeholder="请输入次卡类型名称"
                        >
                            次卡名称：
                        </InputItem>
                        <InputItem
                            value={cardData.discount}
                            onChange={this.onDiscount}
                            type="number"
                            placeholder="请输入销售提成"
                            clear
                            extra="%"
                        >
                            销售提成：
                        </InputItem>
                        <InputItem
                            value={cardData.discount}
                            onChange={this.onDiscount}
                            type="number"
                            placeholder="请输入服务提成"
                            clear
                            extra="元/次"
                        >
                            服务提成：
                        </InputItem>

                    </List>
                </div>
            </div>
        )
    }
}


export default CarItem