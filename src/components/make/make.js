import React from 'react';
import {Button, Icon, DatePicker, Popup} from 'antd-mobile';
import {Link} from 'dva/router'
import styles from './make.less';
import PopupModal from '../vip/popupModal1';
import moment from 'moment';
import EmptyData from '../../components/other/empty'

const CustomChildren = props => (
  <div
    onClick={props.onClick}
  >
    {props.extra}
  </div>
);


class MakeMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      start: this.props.queryFilter.start,
      end: this.props.queryFilter.end,
      type: '',//预约类型
      typeName: '全部预约'
    }

  }

  onOrderDetails() {
    const {onOrderDetails} = this.props;
    onOrderDetails()
  }

  startTime(value) {
    const {onEndTime} = this.props;
    const {start, end, type} = this.state;
    this.setState({
      start: value
    })
    const info = {
      startTime: moment(value).format('YYYY-MM-DD'),
      endTime: moment(end).format('YYYY-MM-DD'),
      AppointmentType: type
    }
    onEndTime(info)
  }

  endTime(value) {
    const {onEndTime} = this.props;
    const {start, end, type} = this.state;
    this.setState({
      end: value
    })

    const info = {
      startTime: moment(start).format('YYYY-MM-DD'),
      endTime: moment(value).format('YYYY-MM-DD'),
      AppointmentType: type
    }
    onEndTime(info)
  }

  onChangeType() {
    const self = this;
    const {start, end, type} = this.state;
    const {onEndTime} = this.props;
    const popupProps = {
      title: '预约类型',
      //dataList:[{Id:'',Name:'全部预约'},{Id:0,Name:'基础疫苗'},{Id:1,Name:'加强疫苗'},{Id:2,Name:'驱虫'},{Id:3,Name:'回访'},{Id:4,Name:'门诊'},{Id:7,Name:'专家门诊'},{Id:5,Name:'美容洗澡'},{Id:6,Name:'其它'}],
      dataList: [{Id: '', Name: '全部预约'}, {Id: 0, Name: '美容洗澡'}, {Id: 1, Name: '寄养服务'}, {Id: 2, Name: '其他预约'}],
      onSubmit(id, name) {
        self.setState({
          type: id,
          typeName: name
        })
        const info = {
          startTime: moment(start).format('YYYY-MM-DD'),
          endTime: moment(end).format('YYYY-MM-DD'),
          AppointmentType: id
        }
        onEndTime(info)
        Popup.hide();
      },
      onClose() {
        Popup.hide();
      }
    }
    Popup.show(<div>
      <PopupModal {...popupProps}/>
    </div>, {animationType: 'slide-up'});
  }

  changeName(id) {
    let name = '';
    //0：基础疫苗，1：加强疫苗，2：驱虫，3：回访，4：门珍，7:专家门珍，5：美容洗澡,6:其它
    switch (id) {
      case '0':
        name = '美容洗澡'
        break;
      case '1':
        name = '寄养服务'
        break;
      case '2':
        name = '其他预约'
        break;
      default:
        name = '全部预约'
        break;
    }

    return name
  }

  confimComing(data) {
    const {confimComing} = this.props;
    const {start, end, type} = this.state;
    var params = {
      id: data.Id,
      startTime: start.format('YYYY-MM-DD'),
      endTime: end.format('YYYY-MM-DD'),
      AppointmentType: type,
      His_Appointment_Mid: data.Id,
      comingStatus: '0',
      AppointmentTime: data.AppointmentTime,
      news: data.IsAutoSmsNotify == '1' ? true : false,
      weixin: data.IsAutoWeixingNotify == '1' ? true : false,
      note: null
    }

    confimComing(params)
  }

  sendMessage (flag,id){
    const {onSendMessage} = this.props;
    const {start, end, type} = this.state;
    var params = {
      Id: id,
      startTime: start.format('YYYY-MM-DD'),
      endTime: end.format('YYYY-MM-DD'),
      AppointmentType: type
    }

    onSendMessage(flag,params);
  }

  render() {
    const {start, end, typeName} = this.state;
    const {makeList} = this.props;

    return (
      <div className={styles.MakeMain}>
        <div className="search_header">
          <div className="search_query">
            <div className="line"></div>
            <div className="time">
              <div className="start">
                <DatePicker
                  mode="date"
                  title="选择开始日期"
                  format={val => val.format('YYYY年MM月DD日')}
                  value={start}
                  maxDate={end}
                  onChange={this.startTime.bind(this)}
                >
                  <CustomChildren></CustomChildren>
                </DatePicker>
              </div>
              <div className="end">
                <DatePicker
                  mode="date"
                  title="选择结束日期"
                  format={val => val.format('YYYY年MM月DD日')}
                  value={end}
                  minDate={start}
                  onChange={this.endTime.bind(this)}
                >
                  <CustomChildren></CustomChildren>
                </DatePicker>
              </div>
            </div>
            <div className="icon">
              <Icon type="down" color="#108EE9" size="xxs"/>
            </div>
          </div>
          <div className="search_sum" onClick={this.onChangeType.bind(this)}>
            {typeName}<Icon type="down" color="#108EE9"/>
          </div>

        </div>


        <div className="make_list">
          {
            (!(makeList instanceof Array) || makeList.length == 0) ? <EmptyData/> :
              <ul>
            {
             makeList.map((data, index) => {
                return (
                  <li key={index}>
                    <div className="title">
                      <span className="name">{this.changeName(data.AppointmentType)}</span>
                      <span className="info">{data.AppointmentTime}</span>
                      {
                        data.Iscoming == '0' ? <span className="status in">已到店</span> :
                          <span className="status no">未到店</span>
                      }
                    </div>
                    <div className="contact">
                      <div>{data.His_Consumer_Name}（{data.His_Pet_Name}）<span>{data.His_Consumer_Phone}</span></div>
                      <div>备注：{data.Discription}</div>
                    </div>
                    {data.Iscoming == '1' ? <div className="settle">
                      <Button type="ghost" size="small" inline
                              onClick={this.confimComing.bind(this, data)}>确认到店</Button>
                      <Button type="ghost" size="small" inline onClick={this.sendMessage.bind(this,'sms',data.Id)}>短信提醒({data.SmsCount?data.SmsCount:0})</Button>
                      <Button type="ghost" size="small" inline onClick={this.sendMessage.bind(this,'wx',data.Id)}>微信提醒({data.WeixinCount?data.WeixinCount:0})</Button>
                    </div> : ''}
                  </li>
                )
              })
            }
          </ul>
          }
        </div>
      </div>
    )
  }
}


export default MakeMain
