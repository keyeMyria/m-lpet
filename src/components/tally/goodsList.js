import React from 'react';
import { SearchBar,Button,List} from 'antd-mobile';
import { Link } from 'dva/router'
import Tloader from 'react-touch-loader';
import styles from './goodsList.less';
const Item = List.Item;
const Brief = Item.Brief;

class GoodsList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            pageIndex:2
        }

    }

    loadMore(resolve){
        const {loadMore} = this.props;
        const {pageIndex} = this.state;
        this.setState({
            pageIndex:pageIndex+1
        })
        loadMore(pageIndex,resolve)

    }

    onEdit(data){
        const {onEdit} = this.props;
        onEdit(data)
    }

    render(){
        const {dataList,totalPage} = this.props;
        const {pageIndex} = this.state;
        return (
            <div className={styles.manageListMain}>
                <div className="manage_content">

                    <List>
                        {
                            dataList.map((data,index) => {
                                return (
                                    <Item key={index}>
                                        <Item
                                            arrow="horizontal"
                                            thumb={data.CommodityImg ? data.CommodityImg : require("../../assets/img.png")}
                                            multipleLine
                                            onClick={this.onEdit.bind(this,data)}
                                            >
                                            <div className="title">
                                                <div>{data.Name}</div>
                                                <p>￥{data.SalePrice?data.SalePrice:'0.00'}</p>
                                            </div>
                                            <Brief><span>条码: {data.EnCode}</span><span>库存: {data.Number}</span></Brief>
                                        </Item>
                                    </Item>
                                )
                            })
                        }
                    </List>

                </div>


            </div>
        )
    }
}


export default GoodsList
