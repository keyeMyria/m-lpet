import React from 'react';
import { List, InputItem, Button, Icon, Checkbox ,Modal,Toast} from 'antd-mobile'
import { createForm } from 'rc-form';
import classNames from 'classnames'
import styles from './login.less';
const CheckboxItem = Checkbox.CheckboxItem;
import { Link } from 'dva/router'
const alert = Modal.alert;




class LoginMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: localStorage.login_auto_login == 'true',
            tabStatus: '1',
            count:60,
            liked:true,
        }
    }

    onChange = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    onSubmit = () => {
        const { onSubmit } = this.props;
        this.props.form.validateFields((error, value) => {
            console.log(value)
            onSubmit(value)
            localStorage.login_auto_login = this.state.checked
            localStorage.login_auto_name = this.state.checked ? value.LoginName : ''
        });
    }


    onCodeSubmit = () => {
        this.props.form.validateFields((error, value) => {
            console.log(value)
            
        });
        // alert('提醒','该手机号未注册，请先注册～',[{text:'知道了'},{text:'快速注册'}])       
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
        this.regTel(tel) && this.codeTime()
    }

    onChangeTabs = (status) => {
        this.setState({
            tabStatus: status
        })
    }

    render() {
        const { getFieldProps } = this.props.form;
        const { tabStatus ,liked,count} = this.state;

        const codeText = liked ? '获取验证码' : count + '秒后重发';

        return (
            <div className={styles.login}>
                <div className="logoImg"></div>
                <div className="tabs">
                    <div className={classNames(['tab', { 'active': tabStatus == '1' }])} onClick={this.onChangeTabs.bind(null, '1')}>密码登录</div>
                    <div className={classNames(['tab', { 'active': tabStatus == '2' }])} onClick={this.onChangeTabs.bind(null, '2')}>验证码登录</div>
                </div>
                {
                    tabStatus == '1' && <div className="loginMain">
                        <List>
                            <InputItem
                                {...getFieldProps('LoginName', {
                                    initialValue: localStorage.login_auto_name
                                })}
                                clear
                                placeholder="请输入手机号"
                            >
                                <div className="icon user" />
                            </InputItem>
                            <InputItem
                                {...getFieldProps('LoginPassword')}
                                clear
                                placeholder="请输入密码"
                                type="password"
                            >
                                <div className="icon pass" />
                            </InputItem>
                        </List>

                        <div className="checkox">
                            <Checkbox onChange={() => this.onChange()} checked={this.state.checked}>
                                下次自动登录
                        </Checkbox>
                        </div>

                        <div className="submit">
                            <Button type="primary" size="large" onClick={() => this.onSubmit()}>登录</Button>
                        </div>
                        <div className="register-content">
                            <Link to="/register">手机快速注册</Link>
                            <Link to="/findPassword">忘记密码</Link>
                        </div>
                    </div>
                }
                {
                    tabStatus == "2" && <div className="code-content">
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
                                <div className="icon pass" />
                            </InputItem>
                        </List>

                        <div className="submit">
                            <Button type="primary" size="large" onClick={() => this.onCodeSubmit()}>登录</Button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}


export default createForm()(LoginMain)