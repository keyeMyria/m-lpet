import React from 'react';
import { SegmentedControl,SearchBar,Button} from 'antd-mobile';
import { Link } from 'dva/router'
import styles from './vipList.less';

class VipListMain extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            searchValue:''
        }

    }

    onSucceed(){
        const {onSucceed} = this.props;
        onSucceed()
    }
    
    onChange(e){
        const {onChangeTabs} = this.props;
        onChangeTabs(e.nativeEvent.selectedSegmentIndex)
    }

    onSearch(value){
        const {onSearch} = this.props;
        onSearch(value);
    }

    onCancel(){
        this.setState({
            searchValue:''
        })
        const {onCancel} = this.props;
        onCancel()
    }
    
    onSearchChange(value){
        this.setState({
            searchValue:value
        })
    }

    changeVip(data){
        const {changeVip} = this.props;
        changeVip(data)
    }

    onLinkDetail = (id) => {
        const {onLinkDetail} = this.props;
        onLinkDetail(id)
    }

    render(){
        const {vipList,isVip,selectedSegmentIndex} = this.props;
        const {searchValue} = this.state;
        return (
            <div className={styles.vipListMain}>
                <div className="tabs_perch"></div>
               <div className="tabs">
                    <SegmentedControl 
                        selectedIndex={selectedSegmentIndex} 
                        values={['默认', '按消费金额', '按储蓄金额']} 
                        onChange={this.onChange.bind(this)}
                        />
               </div>
               <div className="search">
                    <SearchBar 
                        placeholder="输入姓名/电话/宠物昵称/会员卡号搜索" 
                        onSubmit={this.onSearch.bind(this)}
                        onCancel={this.onCancel.bind(this)}
                        value={searchValue}
                        onChange={this.onSearchChange.bind(this)}
                        />
               </div>
               <div className="vip_content">
                    { vipList.length == 0 ? <div className="noData">
                        <img src={require('../../assets/kong.png')} alt=""/>
                        <p>暂无会员，点击页面右上角新增会员</p>
                    </div> : ''}

                    <div className="vip_list">
                            {
                           vipList && vipList.length > 0 &&
                           vipList.map((data,index) => {
                                return (
                                    <div className="vip_item" key={index} onClick={(isVip == '1' || isVip == '2') ? this.changeVip.bind(this,data) : this.onLinkDetail.bind(null,data.Id)}>
                                        <div className="header">
                                            <div className="header_name"><span>{data.Name}</span><span>{data.Mobile}</span></div>
                                            {isVip == true ? '' : <div className="header_button"><Button size="small"><Link to={{pathname:'/vipList/vipCard',query:{userId:data.Id}}}>办会员卡</Link></Button><Button size="small"><Link to={{pathname:'/vipList/vipRefill',query:{userId:data.Id,vipName:data.Name}}}>会员充值</Link></Button></div>}
                                        </div>
                                        <div className="dog">
                                            {
                                                data.consumerPetInfo.map((info,index) => {
                                                    return (
                                                        <span key={index}><img src={require(`../../assets/${info.Sex == '公' ? 'gong' : 'mu'}.png`)} alt=""/>{info.Name}{ info.Code ? `（${info.Code}）` : ''}</span>
                                                    )
                                                })
                                            }
                                            
                                        </div>
                                        <div className="card">
                                            {
                                                data.consumerCardInfo.map((info,index) => {
                                                    return (
                                                        <span key={index}>{`${info.CardType}（${info.Code}）`}</span>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            }) 
                        }
                        
                        
                        

                    </div>
                    
               </div>
            </div>
        )
    }
}


export default VipListMain