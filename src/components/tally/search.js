import React from 'react';
import {SearchBar,Modal} from 'antd-mobile'
import styles from './search.less';
import EmptyData from '../../components/other/empty'

const prompt = Modal.prompt;


class SearchMain extends React.Component{

    constructor(props){
        super(props);
    }

    onSearch = (value) => {
        const {onSearch} = this.props;
        onSearch(value);
    }
    
    onCancel = () => {
        const {onCancel} = this.props;
        onCancel()
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

    render(){
        const {searchData, keyword,placeholder = '输入商品名称/价格/条码搜索',cancelText = '取消'} = this.props;
        return (
            <div className={styles.search}>
                <div className="search">
                    <SearchBar value={this.props.keyword}
                        placeholder={placeholder}
                        showCancelButton={true}
                        onCancel={this.onCancel}
                        onChange={this.onSearch}
                        cancelText={cancelText}
                        ></SearchBar>
                </div>
                <div className="container">
                    <div className="container-right">
                        <ul>
                            {
                                !(searchData instanceof Array) || searchData.length < 1 ?
                                <EmptyData/> 
                                :
                                searchData.map((data,index) => {
                                    return (
                                        <li key={data.Id}>
                                            <div className="icon"><img src={data.CommodityImg ? data.CommodityImg : require("../../assets/img.png")} alt=""/></div>
                                            <div className="container-text">
                                                <div className="title">{data.Name}</div>
                                                <div className="info">
                                                    <span className="price" onClick={this.onEditPrice.bind(null,data.Id,data.addNumber,data.SalePrice,data.Con_Category_Mid,data)}>{data.SalePrice}</span>
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
                    </div>
                </div>
            </div>
        )
    }
}


export default SearchMain