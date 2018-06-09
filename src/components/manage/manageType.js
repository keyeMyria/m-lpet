import React from 'react';
import { SearchBar,Button,List,Icon,Modal,Toast} from 'antd-mobile';
import { Link } from 'dva/router'
import styles from './manageType.less';
const Item = List.Item;
const prompt = Modal.prompt;


class ManageTypeMain extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }

    }

    onLeftType(index,id,name){
        const {getDataList} = this.props;
        getDataList(id,index,name)
    }

    onAddBigType(){
        prompt('新增大类','',[{text:'取消'},{text:'确认',onPress: this.onEditBigPress.bind(this)}],'default')
    }

    onEditBigPress(value){
        const {addCategory} = this.props;

      if(value.replace(/\s+/g,"")){
        value = value.replace(/^\s+|\s+$/g,"");
        addCategory(value);
      } else {
        Toast.fail('大类名称为空,添加失败!!', 0.8)
      }

    }

    onAddType(){
        prompt('新增类别','',[{text:'取消'},{text:'确认',onPress:this.onAddPress.bind(this)}],'default')
    }

    onAddPress(value){
        const {addTypeData} = this.props;

        if(value.replace(/\s+/g,"")){
          value = value.replace(/^\s+|\s+$/g,"");
          addTypeData(value);
        } else {
          Toast.fail('类别名称为空,添加失败!', 0.8)
        }


    }

    onEditBigType(){
        const {onEditBigType} = this.props;
        onEditBigType()
    }

    onEditType(){
        const {onEditType} = this.props;
        onEditType()
    }

    render(){
        const {categoryList,dataList,typeIndex} = this.props;
        return (
            <div className={styles.manageType}>
                <div className="left">
                    <div className="title">大类<div className="icon"><img src={require("../../assets/edit.png")} onClick={this.onEditBigType.bind(this)} alt=""/></div></div>
                    <ul>
                        {
                            categoryList.map((data,index) => {
                                return (
                                    <li
                                        className={`${typeIndex == index ? 'active' : ''}`}
                                        onClick={this.onLeftType.bind(this,index,data.Id,data.Name)}
                                        key={index}
                                    >{data.Name}</li>
                                )
                            })
                        }
                    </ul>
                    <div className="addType" onClick={this.onAddBigType.bind(this)}>
                        新增大类
                    </div>
                </div>
                <div className="right">
                    <div className="title">类别<div className="icon"><img src={require("../../assets/edit.png")} onClick={this.onEditType.bind(this)} alt=""/>编辑</div></div>
                    <ul>
                        {
                            dataList.map((data,index) => {
                                return (
                                    <li key={index}>{data.Name}</li>
                                )
                            })
                        }
                    </ul>
                    <div className="addType" onClick={this.onAddType.bind(this)}>新增类别</div>
                </div>
            </div>
        )
    }
}


export default ManageTypeMain
