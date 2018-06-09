import React from 'react';
import { SearchBar,Button,List} from 'antd-mobile';
import { Link } from 'dva/router'
import Tloader from 'react-touch-loader';
import styles from './manageList.less';
import EmptyData from '../../components/other/empty'

const Item = List.Item;
const Brief = Item.Brief;

class ManageListMain extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }

    }

    onSearch = (value) => {
        const {onSearch} = this.props;
        onSearch(value);
    }


    onSearchChange = (value) => {
        const {onSearchChange} = this.props;
        onSearchChange(value)
    }

    loadMore(resolve){
        const {loadMore} = this.props;

        loadMore(resolve)

    }

    onEdit(data){
        const {onEdit} = this.props;
        onEdit(data)
    }

    addCommit(){
        const {addCommit} = this.props;
        addCommit()
    }

    onGetCode(){
        const {saveQRCode} = this.props;
        window.wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success (res) {
                    const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    var data = '';
                    if(result.indexOf(',') == -1){
                        data = result;
                    }else{
                        data = result.split(',')[1]
                    }
                    saveQRCode(data)
                }
          })
    }

    render(){
        const {manageList,moneyData,totalPage,pageIndex,keyword} = this.props;
        const cancelText = <div className="searCode"><img src={require('../../assets/searchCode.png')} alt=""/><span>扫码搜索</span></div>
        return (
            <div className={styles.manageListMain}>
                <div className="header_search">
                    <SearchBar
                        onSubmit={this.onSearch}
                        onCancel={this.onGetCode.bind(this)}
                        value={keyword}
                        onChange={this.onSearchChange.bind(this)}
                        showCancelButton={true}
                        cancelText={cancelText}
                        placeholder="输入商品名称/价格/条码搜索" />
                </div>

                <div className="manage_content">
                <Tloader
                        initializing={false}
                        hasMore={manageList.length > 0 ? (pageIndex > totalPage ? false :true) : false}
                        onLoadMore={(resolve) => this.loadMore(resolve)}
                        autoLoadMore={true}
                        className="tloader">
                    <List>

                        {
                            !manageList || manageList.length < 1 ?
                            <EmptyData/>
                            :
                            manageList.map((data,index) => {
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
                                            <Brief><span>条码: {data.EnCode}</span><span>库存: {data.Number?data.Number:0}</span></Brief>
                                        </Item>
                                    </Item>
                                )
                            })
                        }

                    </List>
                </Tloader>
                </div>

                <div className="footer_fixed"></div>
                <div className="manage_footer">
                    <div className="footer_left">
                        <p>总库存(件)：<span>{moneyData.stock}</span></p>
                        <p>总成本：<span>{moneyData.money}</span></p>
                    </div>
                    <div onClick={this.addCommit.bind(this)} className="footer_right">
                        添加商品
                    </div>
                </div>
            </div>
        )
    }
}


export default ManageListMain
