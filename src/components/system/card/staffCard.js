import React from 'react';
import styles from './staffCard.less';
import { List, InputItem ,Modal,Icon,Popup} from 'antd-mobile'
import PopupModal from './popupModal'
const alert = Modal.alert;
const Item = List.Item;
//
class CarItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post:''
        }
    }


    onDelete = (index) => {
        const {cardData} = this.props;        
        alert('提醒',<div className="alert-delete"><div>确定要删除员工{index+1 < 10 ? `0${index+1}` : index+1}吗？</div><div>删除后，卡片信息将不存在</div></div>,[{text:'取消'},{text:'删除',onPress:cardData.onDelete.bind(index)}])
        
    }

    onVipCardName = (value) => {
        const {cardData} = this.props;
        cardData.onChangeCardData(cardData.index,'vipCardName',value)
    }

    onDiscount = (value) => {
        const {cardData} = this.props;
        cardData.onChangeCardData(cardData.index,'discount',value)        
    }

    onShowPost = () => {
        const _this = this;
        const popupProps = {
            dataList: [{Id:1,Name:'院长'},{Id:2,Name:'医生'},{Id:3,Name:'前台'}],
            onSubmit(id, name) {
            //   submitName(id, name)
                _this.setState({
                    post:name
                })
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
        const {cardData} = this.props;
        const {post} = this.state;

        return (
            <div className={styles.cardItem}>
                <div className="card-header">
                    <img src={require('../../../assets/icon_yuangong_small2x.png')} alt="" />
                    <span>员工{cardData.index+1 < 10 ? `0${cardData.index+1}` : cardData.index+1}</span>
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
                        >
                            姓名：
                        </InputItem>
                        <InputItem
                            value={cardData.tel}
                            onChange={this.onVipCardName}
                            type="text"
                            clear
                        >
                            电话：
                        </InputItem>
                        
                        <Item
                            extra={<Icon type="right" color="#108EE9"/>}
                            onClick={this.onShowPost}
                        >
                            职位：{post}
                      </Item>
                      <Item
                            className="must"
                            extra={<Icon type="right" color="#108EE9"/>}
                        >
                            权限：
                        </Item>
                    </List>
                </div>
            </div>
        )
    }
}


export default CarItem