import React from 'react';
import {Button,Icon,DatePicker} from 'antd-mobile';
import { Link } from 'dva/router'
import styles from './searchSell.less';
import moment from 'moment';
import EmptyData from '../../components/other/empty'

const start = moment();
const end = moment();
const CustomChildren = props => (
        <div
            onClick={props.onClick}
        >
            {props.extra}
        </div>
);


class SearchSellMain extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            start:start,
            end:end
        }

    }

    onOrderDetails(id){
        const {onOrderDetails} = this.props;
        onOrderDetails(id)
    }

    startTime(value){
        const {onEndTime} = this.props;
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
        const {sellList,total} = this.props;
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
                                    minDate={start}
                                    format={val => val.format('YYYY年MM月DD日')}
                                    value={end}
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
                        <div className="text">销售总额（元）</div>
                        <div className="price">{total.Total}</div>
                    </div>
                    <div className="search_fact">
                        <div className="text">实际销售（元）</div>
                        <div className="price">{total.Paypal}</div>
                    </div>
                </div>


                <div className="search_list">
                    <ul>
                        {
                            !(sellList instanceof Array) || sellList.length < 1 ? 
                            <EmptyData/> 
                            :
                            sellList.map((data,index) => {
                                return (
                                    <li key={index} onClick={this.onOrderDetails.bind(this,data.billId)}>
                                        <div className="title">
                                            <span className="name">{data.Name ? data.Name : '散客'}</span>
                                            <span className="info">{data.petName ? <img src={require(`../../assets/${data.Sex == '公' ? 'gong' : 'mu'}.png`)} alt=""/> : ''}{data.petName}&nbsp;{data.petCode}</span>
                                        </div>
                                        <div className="time">
                                            <div>{data.PayTime}</div>
                                            <div>{data.billCode}</div>
                                        </div>
                                        <div className="settle">
                                            <Button type="ghost" size="small" inline>结算</Button>
                                            <div className="price">￥{data.PayTotal}</div>
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


export default SearchSellMain
