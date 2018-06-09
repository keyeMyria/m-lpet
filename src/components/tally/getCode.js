import React from 'react';
import { Button} from 'antd-mobile';
import styles from './getCode.less';


class GetCode extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }

    }

    onGetCode(){
        const {saveQRCode} = this.props;
        window.wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success (res) {
                    const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    var data = '';
                    if(result.indexOf(',') == -1){
                        data = result;
                    }else{
                        data = result.split(',')[1]
                    }
                    saveQRCode(data)
                }
          })
    }

    render(){
        return (
            <div className={styles.getCode}>
                <Button type="primary" onClick={this.onGetCode.bind(this)}>点击扫码</Button>
            </div>
        )
    }
}


export default GetCode
