import React from 'react';
import styles from './vipManage.less';
import {  Button} from 'antd-mobile'

import CardItem from './card/staffCard'

class StaffManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardList: [],
        }
    }

    onSubmit = () => {
        const {cardList} = this.state;
        console.log(cardList)
    }

    addVipCard = () => {
        const {cardList} = this.state;
        const info = {
            vipCardName:'',
            discount:'',
            switchStatus:false
        }
        cardList.push(info)
        this.setState({
            cardList,
        })
    }


    render() {
        const { cardList } = this.state;

        const _this = this;

        return (
            <div className={styles.vipManage}>

                {
                    cardList.length == 0 ? <div className="kong-content">
                        <div className="kong">
                            <img src={require('../../assets/kong.png')} alt="" />
                            <p>您未添加任何员工</p>
                            <a className="addBtn" onClick={this.addVipCard}>添加员工</a>
                        </div>
                    </div>
                        :
                        <div className="card-list">
                            {
                                cardList.map((data, index) => {
                                    const cardData = {
                                        ...data,
                                        index,
                                        onChangeCardData(index,name,value){
                                            cardList[index][name] = value;
                                            _this.setState({
                                                cardList
                                            })
                                        },
                                        onDelete(index){
                                            cardList.splice(index,1);
                                            console.log(cardList)
                                            _this.setState({
                                                cardList
                                            })
                                        }
                                    }
                                    
                                    return <CardItem key={index} cardData={cardData}/>
                                })
                            }
                            <a className="addBtn" onClick={this.addVipCard}>添加员工</a>
                        </div>
                }



                <div className="submit">
                    <Button type="primary" onClick={this.onSubmit}>保存</Button>
                </div>
            </div>
        )
    }
}


export default StaffManage