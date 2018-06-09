import React from 'react';
import styles from './vipDetail.less';
import { Icon } from 'antd-mobile'


class VipDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {

        return (
            <div className={styles.vipDetail}>
                <div className="vip-detail-container">


                    <div className="vipDetail-header">
                        <div className="vip-bg"></div>
                        <div className="vip-card">
                            <div className="card-header">
                                <div className="card-title">
                                    <img src={require('../../assets/vip_active.png')} alt="" />
                                    <span>刘彦彦</span>
                                </div>
                                <div className="card-edit">编辑</div>
                            </div>
                            <div className="card-content">
                                <div className="item">
                                    <img src={require('../../assets/icon_xingbie2x.png')} alt="" />
                                    <span>女（27岁）</span>
                                </div>
                                <div className="item">
                                    <img src={require('../../assets/icon_dianhua2x.png')} alt="" />
                                    <span><a href="tel:18203728326">18203728326</a></span>
                                </div>
                                <div className="item">
                                    <img src={require('../../assets/icon_dizhi2x.png')} alt="" />
                                    <span>海淀区马甸南路2号院3号楼星程酒店2层</span>
                                </div>
                                <div className="item">
                                    <img src={require('../../assets/icon_laiyuan2x.png')} alt="" />
                                    <span>朋友推荐</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="money-container">
                        <div className="grid-row">
                            <div className="grid-item">
                                <p className="title"><em>3</em>张</p>
                                <p className="info"><img src={require('../../assets/icon_huiyuanka_small2x (1).png')} alt="" />会员卡<Icon type="right" /></p>
                            </div>
                            <div className="grid-item">
                                <p className="title"><em>2</em>张</p>
                                <p className="info"><img src={require('../../assets/icon_cika_small2x (1).png')} alt="" />次卡<Icon type="right" /></p>
                            </div>
                        </div>
                        <div className="grid-row">
                            <div className="grid-item">
                                <p className="title">32283784元</p>
                                <p className="info">押金</p>
                            </div>
                            <div className="grid-item">
                                <p className="title">32283784元</p>
                                <p className="info">积分</p>
                            </div>
                        </div>
                    </div>


                    <div className="pet-container">
                        <div className="pet-header">
                            <div className="pet-title">
                                <img src={require('../../assets/Group 7@2x.png')} alt="" />
                                <span>宠物:2只</span>
                            </div>
                            <div className="pet-add">
                                <img src={require('../../assets/add.png')} alt="" />
                                <span>添加宠物</span>
                            </div>
                        </div>

                        <div className="pet-content">
                            <div className="pet-item">
                                <div className="pet-item-header">
                                    <div className="pet-img"></div>
                                    <div className="pet-name">
                                        <p className="title">萧萧（公）</p>
                                        <p className="code">编号P2736724</p>
                                    </div>
                                    <div className="pet-tag">
                                        <span>已绝育</span>
                                        <span>已绝育</span>
                                        <span>已绝育</span>
                                    </div>
                                </div>

                                <div className="pet-item-content">
                                    <div className="pet-type">
                                        <span>种类：猫</span>
                                        <span>品种：英短</span>
                                        <span>年龄：13岁12个月</span>
                                    </div>
                                    <div className="pet-remark">
                                        备注：比较顽皮，杀伤力强...
                                </div>
                                </div>
                            </div>

                            <div className="pet-item">
                                <div className="pet-item-header">
                                    <div className="pet-img"></div>
                                    <div className="pet-name">
                                        <p className="title">萧萧（公）</p>
                                        <p className="code">编号P2736724</p>
                                    </div>
                                    <div className="pet-tag">
                                        <span>已绝育</span>
                                        <span>已绝育</span>
                                        <span>已绝育</span>
                                    </div>
                                </div>

                                <div className="pet-item-content">
                                    <div className="pet-type">
                                        <span>种类：猫</span>
                                        <span>品种：英短</span>
                                        <span>年龄：13岁12个月</span>
                                    </div>
                                    <div className="pet-remark">
                                        备注：比较顽皮，杀伤力强...
                                </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="card-bth">
                    <span>次卡充值</span>
                    <span>会员卡充值</span>
                    <span>押金管理</span>
                </div>
            </div>
        )
    }
}


export default VipDetail