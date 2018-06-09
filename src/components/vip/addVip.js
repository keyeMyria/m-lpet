import React from 'react';
import {Switch, List, Button, InputItem, Checkbox, DatePicker, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import styles from './addVip.less';
import DogInfo from './dogInfo';

const Item = List.Item;

class AddVipMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      switchChecked: false,
      dogInfoData: [],
      i: 0,
      sex: '男'
    }

  }

  onSwitch(value) {
    this.setState({
      switchChecked: !this.state.switchChecked
    })
  }

  onChecked(value) {
    // 会员性别
    if (value == 'man') {
      this.setState({
        checked: true,
        sex: '男'
      })
    } else if (value == 'woman') {
      this.setState({
        checked: false,
        sex: '女'
      })
    }

  }

  onAddPet() {
    const {onAddPet} = this.props;
    onAddPet()
  }

  onRemovePet(index) {
    this.state.dogInfoData.splice(index, 1)
    this.setState({
      dogInfoData: this.state.dogInfoData
    })
  }

  onDatePicker(value) {
    this.setState({
      dateName: value
    })
  }

  onSubmit() {
    const {validateFields} = this.props.form;
    const {sex, switchChecked} = this.state;
    const {onSubmit} = this.props;
    validateFields((error, value) => {
      //replace(/\s/g,'')
      const {Name, Petname, Mobile} = value
      if(!Name || Name.trim() == ''){
        Toast.fail('请输入会员姓名!', 0.8)
        return
      }

      if(switchChecked && (!Petname || Petname.trim() == '')){
        Toast.fail('请输入宠物名!', 0.8)
        return
      }

      if(!Mobile || Mobile.trim() == ''){
        Toast.fail('请输入会员手机号!', 0.8)
        return
      }

      const info = {
        ...value,
        Mobile: value.Mobile ? value.Mobile.replace(/\s/g, '') : '',
        Sex: sex
      }

      if (switchChecked) {
        var Petinfo = {
          Petname: value.Petname,
          id: 0,
          PetSex: '公',//宠物性别
          Category: '1000000000000000',//宠物类型
          Sterilized: 0,//绝育     0:正常  1:非正常
          Immunity: 0,//免疫
          IsInsecticide: 0,//驱虫
          Dead: 0,//死亡
          Birthday: '',//宠物年龄
          Discription: ''//备注
        }

        var arr = [];
        arr.push(Petinfo);

        info.Petinfo = arr;
      }
      onSubmit(info)
    })
  }

  render() {
    const {getFieldProps} = this.props.form;
    const {checked, switchChecked} = this.state;
    const {dogInfoData, onRemovePet, onChecked, onDatePicker, onChangeDogName, onChangeRemark} = this.props;
    return (
      <div className={styles.addVipMain}>
        <List className="add">
          <Item
            extra={<Switch
              checked={switchChecked}
              onClick={this.onSwitch.bind(this)}
            />}
          >快速新增</Item>
        </List>


        <List className="input">
          <InputItem
            placeholder="输入会员姓名"
            {...getFieldProps('Name')}
            extra={
              <div>
                <Checkbox checked={checked} onChange={this.onChecked.bind(this, 'man')}>男</Checkbox>
                <Checkbox checked={!checked} onChange={this.onChecked.bind(this, 'woman')}>女</Checkbox>
              </div>
            }
          >
          </InputItem>
          <InputItem
            placeholder="输入会员手机号"
            type="phone"
            {...getFieldProps('Mobile')}
          >
          </InputItem>
          {switchChecked &&
          <span>
            <InputItem
              placeholder="输入宠物名"
              {...getFieldProps('Petname')}
            >
          </InputItem>
          </span>}
          <InputItem
            placeholder="输入会员年龄"
            type="number"
            {...getFieldProps('Age',{
              normalize: (v, prev) => {
                if (v && !/^(([1-9]\d)|\d)?$/.test(v)) {
                  if (v === '.') {
                    return '0';
                  }
                  return prev;
                }
                return v;
              },
            })}
          >
          </InputItem>
          <InputItem
            placeholder="输入会员地址"
            {...getFieldProps('Address')}
          >
          </InputItem>
        </List>
        {!switchChecked ? <div className="info_main">
          {dogInfoData.map((data, index) => {
            const dogInfoProps = {
              data,
              index,
              onChecked(id, value) {
                //checked切换状态
                onChecked(id, value)
              },
              onRemovePet(index) {
                //删除
                onRemovePet(index)
              },
              onDatePicker(id, value) {
                //宠物年龄
                onDatePicker(id, value)
              },
              onChangeDogName(id, value) {
                //宠物姓名
                onChangeDogName(id, value)
              },
              onChangeRemark(id, value) {
                //备注
                onChangeRemark(id, value)
              }
            }
            return (
              <DogInfo key={index} {...dogInfoProps} />
            )
          })}

          <div className="addPet" onClick={this.onAddPet.bind(this)}>
            <img src={require('../../assets/addPet.png')} alt=""/>
            <p>添加宠物</p>
          </div>
        </div> : ''}

        <div className="submit_fixed"></div>
        <div className="submit">
          <Button type="primary" onClick={this.onSubmit.bind(this)}>确认</Button>
        </div>
      </div>
    )
  }
}


export default createForm()(AddVipMain)
