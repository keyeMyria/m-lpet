import React from 'react';
import { List, InputItem, Button, Icon, Checkbox, Modal,Toast } from 'antd-mobile'
import { Link } from 'dva/router'
import styles from './register.less';
import { createForm } from 'rc-form';
import classNames from 'classnames'


const Item = List.Item;



class FindPasswordMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count:60,
            liked:true,
        }

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

    onSubmit = () => {
        this.props.form.validateFields((error, value) => {
            console.log(value)
            if(this.regTel(value.tel) && this.regCode(value.code) && this.regPass(value.password1,value.password2)){

            }
            
        });
    }


    render() {
        const { getFieldProps } = this.props.form;
        const {liked,count} = this.state;

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

                    </List>

                    <div className="submit">
                        <Button type="primary" size="large" onClick={this.onSubmit}>确认</Button>
                    </div>

                </div>

            </div>
        )
    }
}


export default createForm()(FindPasswordMain)
