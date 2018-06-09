import React from 'react';
import styles from './editDiscount.less';
import { List , Button} from 'antd-mobile'
import { createForm } from 'rc-form';


class EditDiscount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {

        const { getFieldProps } = this.props.form;

        return (
            <div className={styles.editDiscount}>
                <div className="list">
                    <div className="item">
                        <span>美容类：</span>
                        <div className="input-control">
                            <input
                                type="number"
                                {...getFieldProps('money', {
                                    initialValue: ""
                                })}
                            />
                            <span>折</span>
                        </div>
                    </div>
                    <div className="item">
                        <span>食品类：</span>
                        <div className="input-control">
                            <input
                                type="number"
                                {...getFieldProps('integral', {
                                    initialValue: ""
                                })}
                            />
                            <span>折</span>
                        </div>
                    </div>
                    <div className="item">
                        <span>医药类：</span>
                        <div className="input-control">
                            <input
                                type="number"
                                {...getFieldProps('integral', {
                                    initialValue: ""
                                })}
                            />
                            <span>折</span>
                        </div>
                    </div>
                    <div className="item">
                        <span>疫苗类：</span>
                        <div className="input-control">
                            <input
                                type="number"
                                {...getFieldProps('integral', {
                                    initialValue: ""
                                })}
                            />
                            <span>折</span>
                        </div>
                    </div>
                </div>
                
                <div className="edit-footer">
                    <div className="edit-info">
                        <p><span>*</span>结算时的折扣优惠以此页面的设置为准。</p>
                        <p>更多设置请前往网页版<a href="www.chongwudian.linkpet.com.cn">www.chongwudian.linkpet.com.cn</a></p>
                    </div>
                    <Button type="primary">保存</Button>
                </div>
            </div>
        )
    }
}


export default createForm()(EditDiscount)