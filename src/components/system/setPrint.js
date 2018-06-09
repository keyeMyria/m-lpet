import React from 'react';
import styles from './setPrint.less';
import { List, Switch ,TextareaItem, Button} from 'antd-mobile'
import { createForm } from 'rc-form';

const Item = List.Item;

class SetPrint extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onChangeImg = () => {

    }

    render() {
        const { getFieldProps } = this.props.form;

        return (
            <div className={styles.setPrint}>
                <List renderHeader={() => '店铺信息'}>
                    <Item
                        extra={<Switch
                            {...getFieldProps('Switch1', {
                                initialValue: true,
                                valuePropName: 'checked',
                            })}
                        />}
                    >
                        店铺电话
                    </Item>
                    <Item
                        extra={<Switch
                            {...getFieldProps('Switch1', {
                                initialValue: true,
                                valuePropName: 'checked',
                            })}
                        />}
                    >
                        店铺地址
                    </Item>
                    <Item
                        extra={<Switch
                            {...getFieldProps('Switch1', {
                                initialValue: true,
                                valuePropName: 'checked',
                            })}
                        />}
                    >
                        微信
                    </Item>
                    <Item
                        extra={<Switch
                            {...getFieldProps('Switch1', {
                                initialValue: true,
                                valuePropName: 'checked',
                            })}
                        />}
                    >
                        二维码
                    </Item>
                    <TextareaItem
                        {...getFieldProps('count', {
                        initialValue: "",
                        })}
                        rows={3}
                        count={50}
                        placeholder="请输入宣传语（50字以内）"
                    />
                </List>

                <List renderHeader={() => '会员信息'}>
                    <Item
                        extra={<Switch
                            {...getFieldProps('Switch1', {
                                initialValue: true,
                                valuePropName: 'checked',
                            })}
                        />}
                    >
                        会员手机
                    </Item>
                    <Item
                        extra={<Switch
                            {...getFieldProps('Switch1', {
                                initialValue: true,
                                valuePropName: 'checked',
                            })}
                        />}
                    >
                        会员余额
                    </Item>
                    <Item
                        extra={<Switch
                            {...getFieldProps('Switch1', {
                                initialValue: true,
                                valuePropName: 'checked',
                            })}
                        />}
                    >
                        会员积分
                    </Item>
                </List>

                <div className="submit">
                    <Button type="primary">保存</Button>
                </div>
            </div>
        )
    }
}


export default createForm()(SetPrint)