import React from 'react';
import styles from './contact.less';



class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onChangeImg = () => {
        
    }

    render() {
        

        return (
            <div className={styles.contact}>
                <div className="content">
                    <div className="code">
                        <img src={require('../../assets/erweima2x.png')} alt=""/>
                    </div>
                    <p>「 微信扫码关注，联宠售后客服 」</p>
                    <div className="line"></div>
                    <div className="text">客户中心售后QQ：4001630060</div>
                    <div className="text">联宠免费热线：<a href="tel:400-163-0060">400-163-0060</a></div>
                </div>
            </div>
        )
    }
}


export default Contact