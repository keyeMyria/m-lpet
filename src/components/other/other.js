import React from 'react';
import {Button,Icon,DatePicker} from 'antd-mobile';
import { Link } from 'dva/router'
import styles from './other.less';
import moment from 'moment';
import EmptyData from '../../components/other/empty'

const CustomChildren = props => (
  <div
    onClick={props.onClick}
  >
    {props.extra}
  </div>
);


class OtherMain extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            start: this.props.queryFilter.start,
            end: this.props.queryFilter.end
        }

    }

    startTime(value){
        const {onStartTime,onEndTime} = this.props;
        const {start,end} = this.state;
        this.setState({
            start:value
        })
        const info = {
            startTime:moment(value).format('YYYY-MM-DD'),
            endTime:moment(end).format('YYYY-MM-DD')
        }
        onEndTime(info)
    }

    endTime(value){
        const {onEndTime} = this.props;
        const {start,end} = this.state;
        this.setState({
            end:value
        })

        const info = {
            startTime:moment(start).format('YYYY-MM-DD'),
            endTime:moment(value).format('YYYY-MM-DD')
        }
        onEndTime(info)
    }

    render(){
        const {start,end} = this.state;
        const {otherList,otherData} = this.props;
        return (
            <div className={styles.searchSellMain}>
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
                    <div className="search_sum">
                        <div className="text">收支总数（笔）</div>
                        <div className="price">{otherData.totalList}</div>
                    </div>
                    <div className="search_fact">
                        <div className="text">收支总额（元）</div>
                        <div className="price">{otherData.totalAmount}</div>
                    </div>
                </div>


                <div className="search_list">
                    <ul>
                        {
                            !(otherList instanceof Array)|| otherList.length < 1 ?
                            <EmptyData/> 
                            :
                            otherList.map((data,index) => {
                                return (
                                    <li key={index}>
                                        <div className="title">
                                            <span className="name">{data.Usage}</span>
                                        </div>
                                        <div className="time">
                                            <div>{data.OrderID}</div>
                                            <div>操作人员：{data.Name}</div>
                                        </div>
                                        <div className="settle">
                                            {
                                                data.ChargeType == 0 ? <span className="shouru">收入</span> : <span>支出</span>
                                            }

                                            <div className="price">￥{data.ChargeType == 1 && '-'}{data.OperateMoney}</div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}


export default OtherMain
