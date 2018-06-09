import React from 'react';
import styles from './power.less';
import { Button, Checkbox } from 'antd-mobile'


class Power extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {


        return (
            <div className={styles.power}>
                <div className="power-list">
                    <div className="power-item">
                        <div className="item">
                            <label>系统设置</label>
                            <div className="check-box">
                                <Checkbox >操作</Checkbox>
                                <Checkbox >查看</Checkbox>
                                <Checkbox >无权限</Checkbox>
                            </div>
                        </div>
                    </div>

                    <div className="power-item">
                        <div className="item">
                            <label>收银权限</label>
                            <div className="check-box">
                                <Checkbox >操作</Checkbox>
                                <Checkbox >查看</Checkbox>
                                <Checkbox >无权限</Checkbox>
                            </div>
                        </div>
                    </div>

                    <div className="power-item">
                        <div className="item">
                            <label>会员管理</label>
                            <div className="check-box">
                                <Checkbox >操作</Checkbox>
                                <Checkbox >查看</Checkbox>
                                <Checkbox >无权限</Checkbox>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="save">
                    <Button type="primary">保存</Button>
                </div>
            </div>
        )
    }
}


export default Power