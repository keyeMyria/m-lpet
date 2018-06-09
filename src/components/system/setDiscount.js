import React from 'react';
import styles from './setDiscount.less';
import { List } from 'antd-mobile'
const Item = List.Item;

class SetDiscount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {


        return (
            <div className={styles.setDiscount}>
            
                {/*<div className="kong-content">
                    <div className="kong">
                        <img src={require('../../assets/kong.png')} alt="" />
                        <p>无卡片</p>
                        <p>请先去“会员卡管理”／“次卡管理”中添加相应的卡片</p>
                    </div>
                </div>*/}

                <div className="discount-list">
                    <List>
                        <Item arrow="horizontal" onClick={() => { }}>
                            黄金会员卡
                        </Item>
                        <Item arrow="horizontal" onClick={() => { }}>
                            白金会员卡
                        </Item>
                        <Item arrow="horizontal" onClick={() => { }}>
                            周年庆特惠卡
                        </Item>
                    </List>
                </div>



            </div>
        )
    }
}


export default SetDiscount