import React from 'react';
import { Button,Icon} from 'antd-mobile';
import styles from './orderSucceed.less';

const toNum = (str) => {
    const num = Number(str)
    return isNaN(num) ? '0.00' : num.toFixed(2)
}

class OrderSucceed extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            
        }

    }

    onSucceed(){
        const {onSucceed} = this.props;
        onSucceed()
    }

    render(){
        const {catTotal} = this.props;
        return (
            <div className={styles.orderSucceed}>
                <div className="succeed">
                    <div className="icon"></div>
                    <p>收款成功</p>
                    <h2>￥{toNum(catTotal)}</h2>
                </div>
                <div className="fixed_bottom">
                    <Button type="primary" onClick={this.onSucceed.bind(this)}>完成</Button>
                </div>
            </div>
        )
    }
}


export default OrderSucceed