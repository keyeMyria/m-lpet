import React from 'react';
import { Button, Icon ,List} from 'antd-mobile'
import classNames from 'classnames'
import styles from './system.less';
import { Link,routerRedux } from 'dva/router'

const Item = List.Item;



class System extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {


        return (
            <div className={styles.system}>
                <div className="system-header">
                    <div className="icon"></div>
                    <div className="text">蚨瑞宝贝宠物店
                        {/*<img src={require('../../assets/icon_dianpurenzheng2x.png')}/>*/}
                        <img src={require('../../assets/icon_dianpurenzheng_yirenzheng2x.png')} />
                        <img src={require('../../assets/icon_zhizunban2x.png')} />
                    </div>
                    <div className="btn">
                        <Link to="/system/storeAffirm">去认证</Link>
                        <a>至尊版</a>
                    </div>
                </div>
                <div className="card-content">
                    <div className="card-item">
                        <Link to="/system/vipManage">
                            <div className="icon">
                                <img src={require('../../assets/icon_huiyuankashezhi2x.png')} alt="" />
                            </div>
                            <div className="text">会员卡管理</div>
                        </Link>
                    </div>
                    <div className="card-item">
                        <Link to="/system/onceCardManage">
                            <div className="icon">
                                <img src={require('../../assets/icon_cikashezhi2x.png')} alt="" />
                            </div>
                            <div className="text">次卡管理</div>
                        </Link>
                    </div>
                    <div className="card-item">
                        <Link to="/system/staffManage">
                            <div className="icon">
                                <img src={require('../../assets/icon_yuangongguanli2x.png')} alt="" />
                            </div>
                            <div className="text">员工管理</div>
                        </Link>
                    </div>
                    <div className="card-item">
                        <Link to="/system/company">
                            <div className="icon">
                                <img src={require('../../assets/icon_wanglaidanwei2x.png')} alt="" />
                            </div>
                            <div className="text">往来单位</div>
                        </Link>
                    </div>
                    <div className="card-item">
                        <Link to="/system/setIntegral">
                            <div className="icon">
                                <img src={require('../../assets/icon_jifenshezhi2x.png')} alt="" />
                            </div>
                            <div className="text">积分设置</div>
                        </Link>
                    </div>
                    <div className="card-item">
                        <Link to="/system/setDiscount">
                            <div className="icon">
                                <img src={require('../../assets/icon_zhekouguanli2x.png')} alt="" />
                            </div>
                            <div className="text">折扣设置</div>
                        </Link>
                    </div>
                    <div className="card-item">
                        <Link to="/system/setRemind">
                            <div className="icon">
                                <img src={require('../../assets/icon_tixing2x.png')} alt="" />
                            </div>
                            <div className="text">提醒设置</div>
                        </Link>
                    </div>
                    <div className="card-item">
                        <Link to="/system/setWechat">
                            <div className="icon">
                                <img src={require('../../assets/icon_weixinshezhi2x.png')} alt="" />
                            </div>
                            <div className="text">微信设置</div>
                        </Link>
                    </div>
                </div>

                <List >
                    <Item arrow="horizontal" onClick={() => {}}><Link to="/system/contact">联系我们</Link></Item>
                    <Item arrow="horizontal" onClick={() => {}}>数据备份</Item>
                    <Item arrow="horizontal" onClick={() => {}}><Link to="/system/setPrint">打印设置</Link></Item>
                </List>

                <div className="exit">退出账号</div>
            </div>
        )
    }
}


export default System