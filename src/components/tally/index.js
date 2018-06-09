import React from 'react';
import {SearchBar,Modal} from 'antd-mobile'
import styles from './index.less';
import { Link } from 'dva/router'
const prompt = Modal.prompt;


class TallyMain extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }

    }

    checkIndex = (index,id,name) =>{
        const {getDataList} = this.props;
        getDataList(id,index,name)
    }

    onSearch = (value) => {
        const {onSearch} = this.props;
        onSearch()
    }
    onAdd = (id,num=0,price,mid,status) => {
        const {onAdd} = this.props;
        const info = {
            Id:id,
            addNumber:status ? ++num : --num,
            salePrice:price,
            Con_Category_Id:mid
        }
        onAdd(info)
    }



    onEditPrice = (id,num,price,mid,data) => {
        prompt(data.Name, `当前价格：￥${data.SalePrice}`, [
            { text: '取消' },
            { text: '确认修改', onPress: this.onEditPress.bind(null,id,num,price,mid,status)},
            ], 'plain-text', )
    }

    onEditPress = (id,num,price,mid,status,value) => {
        const {onAdd} = this.props;
        const info = {
            Id:id,
            addNumber:num,
            salePrice:value,
            Con_Category_Id:mid
        }
        onAdd(info)
    }

    addCommodity(){
        const {addCommodity} = this.props;
        // addCommodity()
    }

    render(){
        const {typeList,dataList,typeIndex} = this.props;
        return (
            <div className={styles.tally}>
                <div className="search">
                    <SearchBar placeholder="输入商品名称/价格/条码搜索" onFocus={this.onSearch}></SearchBar>
                </div>
                <div className="container">
                    <div className="container-left">
                        <ul>
                            {
                                typeList.map((data,index) => {
                                    return (
                                        <li
                                            key={data.Id}
                                            className={`${typeIndex == index ? 'active' : ''}`}
                                            onClick={this.checkIndex.bind(null,index,data.Id,data.Name)}
                                            >{data.Name}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="container-right">
                        <ul>
                            {
                              dataList && dataList.map((data,index) => {
                                    return (
                                        <li key={data.Id}>
                                            <div className="icon"><img src={data.CommodityImg ? data.CommodityImg : require("../../assets/img.png")} alt=""/></div>
                                            <div className="container-text">
                                                <div className="title">{data.Name}</div>
                                                <div className="info">
                                                    <span className="price" onClick={this.onEditPrice.bind(null,data.Id,data.addNumber,data.SalePrice,data.Con_Category_Mid,data)}>{data.SalePrice?data.SalePrice:'0.00'}</span>
                                                    {/*<span className="num">服务次数：1</span>*/}
                                                    <div className="control">
                                                        {!data.addNumber || data.addNumber == 0 ? '' :  <span><span className="sub com" onClick={this.onAdd.bind(null,data.Id,data.addNumber,data.SalePrice,data.Con_Category_Mid,false)}>-</span><span className="number">{data.addNumber}</span></span>}
                                                        <span className="add com" onClick={this.onAdd.bind(null,data.Id,data.addNumber,data.SalePrice,data.Con_Category_Mid,true)}>+</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                        <div className="addCommodity">
                            <Link to="/tally/addCommodity" onClick={this.addCommodity.bind(this)} className="box">
                                <img src={require("../../assets/tianjia.png")} alt=""/>
                                <div>添加商品</div>
                            </Link>
                            <p>点击商品修改单价</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default TallyMain
