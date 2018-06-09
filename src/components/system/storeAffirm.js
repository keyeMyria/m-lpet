import React from 'react';
import { Button, Icon ,List,InputItem,ImagePicker,Modal} from 'antd-mobile'
import classNames from 'classnames'
import styles from './storeAffirm.less';
import { Link } from 'dva/router'
import {createForm} from 'rc-form';

const Item = List.Item;
const alert = Modal.alert;

class StoreAffirm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onChangeImg = () => {
        alert('门店照片上传说明',<ul className="img-alert"><li>照片大小: 不超过5M</li><li>图片格式: JPG/BMP/PNG</li></ul>,[{text:'知道了'}])
    }

    render() {
    const {getFieldProps} = this.props.form;
        

        return (
            <div className={styles.storeAffirm}>
                <List>
                    <InputItem 
                        placeholder="请输入店铺名称"
                        className="must"
                        clear
                        {...getFieldProps('dian')}
                    ></InputItem>
                    <InputItem 
                        placeholder="请输入联系方式"
                        className="must"
                        clear
                        {...getFieldProps('tel')}
                    ></InputItem>
                    <InputItem 
                        placeholder="请输入详细地址"
                        className="must"
                        clear
                        {...getFieldProps('site')}
                    ></InputItem>
                    <InputItem 
                        placeholder="请输入微信号"
                        clear
                        {...getFieldProps('wx')}
                    ></InputItem>
                </List>

                <div className="addPic">
                    <div className="title must">门店照片 <img src={require('../../assets/icon_tips4@2x.png')} alt="" onClick={this.onChangeImg}/></div>
                    <div className="pic-content">
                        <ImagePicker />
                    </div>
                </div>
                <div className="submit">
                    <Button type="primary">提交</Button>
                    <p>如果店铺认证过程中遇到问题，请联系客服 <a href="tel:400-1630060">400-1630060</a></p>
                </div>
            </div>
        )
    }
}


export default createForm()(StoreAffirm)