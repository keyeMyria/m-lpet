import React from 'react';
import styles from './setRemind.less';
import { Switch ,Checkbox,Button} from 'antd-mobile'



class SetRemind extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            switchStatus1:false,
            switchStatus2:false
        }
    }

    onChangSwitch1 = (value) => {
        this.setState({
            switchStatus1:value
        })
    }

    onChangSwitch2 = (value) => {
        this.setState({
            switchStatus2:value
        })
    }


    render() {
        const {switchStatus1,switchStatus2} = this.state;

        return (
            <div className={styles.setRemind}>
                <div className="remind-list">
                    <div className="remind-item">
                        <div className="remind-header">
                            <span><span className="dx">短信</span>提醒</span>
                            <Switch checked={switchStatus1} onChange={this.onChangSwitch1}/>
                        </div>
                        {switchStatus1 && <div className="remind-content">
                            <div className="remind-content-item">
                                <span>预约到期当天，自动发送</span>
                                <Checkbox />
                            </div>
                            <div className="remind-content-item">
                                <div className="input">预约到期前 <div className="input-control"><input type="number"/><span>天</span></div> 自动发送</div>
                                <Checkbox />
                            </div>
                        </div>}
                    </div>

                    <div className="remind-item">
                        <div className="remind-header">
                            <span><span className="dx">微信</span>提醒</span>
                            <Switch checked={switchStatus2} onChange={this.onChangSwitch2}/>
                        </div>
                        {switchStatus2 && <div className="remind-content">
                            <div className="remind-content-item">
                                <span>预约到期当天，自动发送</span>
                                <Checkbox />
                            </div>
                            <div className="remind-content-item">
                                <div className="input">预约到期前 <div className="input-control"><input type="number"/><span>天</span></div> 自动发送</div>
                                <Checkbox />
                            </div>
                        </div>}
                    </div>
                </div>

                <div className="submit">
                    <Button type="primary">保存</Button>
                </div>
            </div>
        )
    }
}


export default SetRemind