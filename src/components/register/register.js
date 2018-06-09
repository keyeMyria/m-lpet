import React from 'react';
import { List, InputItem, Button, Icon, Checkbox, Modal,Toast } from 'antd-mobile'
import { Link } from 'dva/router'
import styles from './register.less';
import { createForm } from 'rc-form';
import classNames from 'classnames'


const Item = List.Item;



class RegisterMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            count:60,
            liked:true,
        }

    }

    onChangeModal = () => {
        this.setState({
            visible:!this.state.visible
        })
    }


    regTel = (value) => {
        if(value){
            const data = value.replace(/\s+/g,"");
            const reg = /^1[2-9][0-9]{9}$/;
            const flag = reg.test(data);
            if(!flag){
                Toast.info(<div>
                    <img style={{width:'0.9rem',height:'0.9rem',marginTop:'0.2rem',marginBottom:'0.2rem'}} src={require('../../assets/tip_img.png')} alt=""/>
                    <div>请输入正确的手机号</div>
                </div>, 1)
                return false;
            }else{
                return true;
            }
        }else{
            Toast.info(<div>
                <img style={{width:'0.9rem',height:'0.9rem',marginTop:'0.2rem',marginBottom:'0.2rem'}} src={require('../../assets/tip_img.png')} alt=""/>
                <div>请输入正确的手机号</div>
            </div>, 1)
            return false
        }
        
    }

    regPass = (data1,data2) => {
        if(data1 && data2){
            if(data1 == data2){
                return true;
            }else{
                Toast.info(<div>
                    <img style={{width:'0.9rem',height:'0.9rem',marginTop:'0.2rem',marginBottom:'0.2rem'}} src={require('../../assets/tip_img.png')} alt=""/>
                    <div>两次密码不一致</div>
                </div>, 1)
                return false;
            }
        }else{
            Toast.info(<div>
                <img style={{width:'0.9rem',height:'0.9rem',marginTop:'0.2rem',marginBottom:'0.2rem'}} src={require('../../assets/tip_img.png')} alt=""/>
                <div>请输入密码</div>
            </div>, 1)
            return false;
        }
    }

    regCode = (data) => {
        if(data){
            return true;
        }else{
            Toast.info(<div>
                <img style={{width:'0.9rem',height:'0.9rem',marginTop:'0.2rem',marginBottom:'0.2rem'}} src={require('../../assets/tip_img.png')} alt=""/>
                <div>请输入验证码</div>
            </div>, 1)
            return false;
        }
    }

    codeTime = () => {
        const {liked} = this.state;
        if(liked){
            this.time = setInterval(() => {
                let count = this.state.count;
                this.setState({
                    liked:false
                })
                count -= 1;
                if(count < 1){
                    this.setState({
                        liked:true,
                        count:60
                    })
                    clearInterval(this.time)
                }else{
                    this.setState({
                        count:count
                    })
                }
            },100)
        }
    }


    onGetCode = () => {
        const {getFieldValue} = this.props.form;
        const tel = getFieldValue('tel');
        this.regTel(tel) && this.codeTime();
    }

    onRegister = () => {
        this.props.form.validateFields((error, value) => {
            console.log(value)
            if(this.regTel(value.tel) && this.regCode(value.code) && this.regPass(value.password1,value.password2)){

            }
            
        });
    }



    render() {
        const { getFieldProps } = this.props.form;
        const {visible,liked,count} = this.state;

        const codeText = liked ? '获取验证码' : count + '秒后重发';
        return (
            <div className={styles.registerMain}>
                <div className="register-content">
                    <List>
                        <InputItem
                            {...getFieldProps('tel', {
                                initialValue: null
                            })}
                            type="phone"
                            clear
                            placeholder="请输入手机号"
                        >
                            <div className="icon user" />
                        </InputItem>
                        <InputItem
                            {...getFieldProps('code')}
                            placeholder="请输入验证码"
                            type="number"
                            clear
                            extra={
                                <div className={classNames(["code-btn",{'code-active':!liked}])}  onClick={this.onGetCode}>{codeText}</div>
                            }
                        >
                            <div className="icon code" />
                        </InputItem>
                        <InputItem
                            {...getFieldProps('password1', {
                                initialValue: null
                            })}
                            type="password"
                            clear
                            placeholder="设置密码（6-20位字母数字组合）"
                        >
                            <div className="icon pass" />
                        </InputItem>
                        <InputItem
                            {...getFieldProps('password2', {
                                initialValue: null
                            })}
                            type="password"
                            clear
                            placeholder="再次输入密码"
                        >
                            <div className="icon pass" />
                        </InputItem>
                        <InputItem
                            {...getFieldProps('dian', {
                                initialValue: null
                            })}
                            type="text"
                            clear
                            placeholder="请输入店名"
                        >
                            <div className="icon dian" />
                        </InputItem>

                    </List>

                    <div className="submit">
                        <Button type="primary" size="large" onClick={this.onRegister}>注册</Button>
                    </div>

                    <div className="register-info">
                        注册代表您已同意<span onClick={this.onChangeModal}>《联宠小店用户协议》</span>
                    </div>
                </div>

                <Modal
                    popup
                    visible={visible}
                    animationType="slide-up"
                    closable
                    className="modal-content"
                    onClose={this.onChangeModal}
                >
                        <div className="modal-title">
                            《联宠小店用户协议》
                    </div>
                        <div className="modal-body">
                            <p>若您在本协议内容公告变更生效后继续使用本服务的，表示您已充分阅读、理解并接受变更修改后的协议内容，也将遵循变更修改后的协议内容使用本服务；若您不同意变更修改后的协议内容，您应在变更生效前停止使用本服务。</p>
                            <h2>一、定义：</h2>
                            <p>1、花呗支付：指买家在线使用花呗服务进行付款，由支付宝完成代收代付的服务。在确认本协议并开通本服务后，您的店铺将被标志“”标识。</p>
                            <p>2、交易流量（交易款项）：指由支付宝/淘宝平台经营者软件系统所统计的您通过其选定服务类型使用支付服务所完成交易的金额（包括但不限于货款、运费等）。交易流量将作为支付宝向您收费的依据。</p>
                            <p>3、服务费用：指您因使用本服务而须向支付宝支付软件服务费。本服务费用依据交易流量（交易款项）及本协议中支付宝向您明示的费率确定。</p>
                            <p>4、非授权交易：指买家未经过支付宝账户持有人授权，使用该支付宝账户与您直接通过本服务完成的交易。</p>
                            <p>5、“套现”交易：指您与买家通过虚构交易、虚开价格、现金退货等方式向买家直接支付现金。</p>
                            <p>淘宝平台经营者：指法律认可的经营该平台网站的责任主体，有关淘宝平台经营者的信息请查看各家淘宝平台首页底部公布的公司信息和证照信息。“淘宝平台”指由淘宝运营的网络平台，包括但不限于淘宝网，域名为 taobao.com；天猫，域名为tmall.com；阿里旅行·去啊网，域名为alitrip.com；一淘网，域名为etao.com；聚划算，域名为ju.taobao.com。前述主体可单称或统称为淘宝平台经营者。</p>
                        </div>
                        
                    <div className="toLink">
                    <Button type="primary" size="large" onClick={this.onChangeModal}>去注册</Button>
                </div>
                </Modal>

            </div>
        )
    }
}


export default createForm()(RegisterMain)
