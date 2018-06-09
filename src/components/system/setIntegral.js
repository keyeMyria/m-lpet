import React from 'react';
import styles from './setIntegral.less';
import { List, Switch , Button,InputItem} from 'antd-mobile'
import { createForm } from 'rc-form';

const Item = List.Item;

class SetIntegral extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked:false
        }
    }

    onChangeSwitch = (value) => {
        this.setState({
            checked:value
        })
    }

    onSubmit = () => {
        const {validateFields} = this.props.form;
        validateFields((error,value) => {
            console.log(value)
        })
    }

    render() {
        const { getFieldProps } = this.props.form;

        const {checked} = this.state;

        return (
            <div className={styles.setIntegral}>
                <List renderHeader={() => '店铺信息'}>
                    <Item
                        extra={<Switch
                            checked={checked}
                            onChange={this.onChangeSwitch}
                        />}
                    >
                        使用现金、支付宝和微信结算，均可积分
                    </Item>
                </List>

                {checked && <div className="list">
                    <div className="item">
                        <span>消费满：</span>
                        <div className="input-control">
                            <input 
                                type="number" 
                                {...getFieldProps('money',{
                                    initialValue:""
                                })}
                                />
                            <span>元</span>
                        </div>
                    </div>
                    <div className="item">
                        <span>赠&nbsp;&nbsp;&nbsp;送：</span>
                        <div className="input-control">
                            <input 
                            type="number" 
                            {...getFieldProps('integral',{
                                initialValue:""
                            })}
                            />
                            <span>积分</span>
                        </div>
                    </div>
                </div>}
                

                <div className="submit">
                    <Button type="primary" onClick={this.onSubmit}>保存</Button>
                </div>
            </div>
        )
    }
}


export default createForm()(SetIntegral)