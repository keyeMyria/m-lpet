import React from 'react';
import {List, InputItem, Button,Icon,Checkbox,Toast} from 'antd-mobile'
import styles from './index.less';
import { Link } from 'dva/router'


class IndexMain extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            
        }

    }
    onLink(){
        Toast.info('暂未开放，敬请期待', 0.8)
    }

    render(){
        const {indexData} = this.props;
        return (
            <div className={styles.index}>
                <div className="banner"></div>
                <div className="main">
                    <div className="dataHeader">
                        <div>
                            <h2>{indexData.countAppointment}</h2>
                            <p>预约服务</p>
                        </div>
                        <div>
                            <h2>{indexData.countBill}</h2>
                            <p>本月订单</p>
                        </div>
                        <div>
                            <h2>{indexData.recharge}</h2>
                            <p>本月充值</p>
                        </div>
                    </div>

                    <div className="grid">
                            <Link to="/tally" className="gridItem">
                                <div className="icon">
                                    <img src={require("../../assets/shouyin.png")} alt=""/>
                                </div>
                                <div className="text">收银</div>
                            </Link>
                            <Link to="/vipList" className="gridItem gridCenter">
                                <div className="icon">
                                    <img src={require("../../assets/huiyuan.png")} alt=""/>
                                </div>
                                <div className="text">会员</div>
                            </Link>
                            <Link to="/manageList" className="gridItem">
                                <div className="icon">
                                    <img src={require("../../assets/guanli.png")} alt=""/>
                                </div>
                                <div className="text">商品管理</div>
                            </Link>
                        
                            <div onClick={this.onLink} className="gridItem">
                                <div className="icon">
                                    <img src={require("../../assets/fuwu.png")} alt=""/>
                                </div>
                                <div className="text">寄养服务</div>
                            </div>
                            <Link to="/searchSell" className="gridItem gridCenter">
                                <div className="icon">
                                    <img src={require("../../assets/chaxun.png")} alt=""/>
                                </div>
                                <div className="text">查询销售</div>
                            </Link>
                            <div onClick={this.onLink} className="gridItem">
                                <div className="icon">
                                    <img src={require("../../assets/baobiao.png")} alt=""/>
                                </div>
                                <div className="text">报表</div>
                            </div>

                            <Link to="/other" className="gridItem">
                                <div className="icon">
                                    <img src={require("../../assets/shouzhi.png")} alt=""/>
                                </div>
                                <div className="text">其它收支</div>
                            </Link>
                            <Link to="/make" className="gridItem gridCenter">
                                <div className="icon">
                                    <img src={require("../../assets/yuyue.png")} alt=""/>
                                </div>
                                <div className="text">预约服务</div>
                            </Link>
                            <Link to="/system" className="gridItem gridCenter">
                                <div className="icon">
                                    <img src={require("../../assets/yuyue.png")} alt=""/>
                                </div>
                                <div className="text">系统设置</div>
                            </Link>
                    </div>
                </div>
            </div>
        )
    }
}


export default IndexMain