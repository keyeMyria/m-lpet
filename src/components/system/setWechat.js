import React from 'react';
import styles from './setWechat.less';
import { List ,InputItem,Button} from 'antd-mobile'
const Item = List.Item;


class SetWechat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wechatStatus:true
        }
    }


    render() {
        const {wechatStatus} = this.state;

        return (
            <div className={styles.setWechat}>
                {wechatStatus ? <div className="wechat-list">
                    <List renderHeader={() => <div>微信设置<span>(医院如需使用自己的公众号,请在这里进行设置)</span></div>}>
                        <InputItem >
                            <i>*</i>App ID：
                        </InputItem>
                        <InputItem >
                            <i>*</i>App Secret：
                        </InputItem>
                    </List>

                    <div className="wechat-submit">
                        <Button type="primary">下一步</Button>
                        <Button type="ghost">保存</Button>
                    </div>
                </div> :
                <div className="wechat-list">
                    <List renderHeader={() => <div>模板ID设置</div>}>
                        <InputItem >
                            预约提醒 ID：
                        </InputItem>
                        <InputItem >
                            消息提醒 ID：
                        </InputItem>
                        <InputItem >
                            次卡消费 ID：
                        </InputItem>
                    </List>

                    <div className="wechat-submit">
                        <Button type="primary">保存</Button>
                        <Button type="ghost">跳过此页并保存</Button>
                    </div>
                </div>
            }
            </div>
        )
    }
}


export default SetWechat