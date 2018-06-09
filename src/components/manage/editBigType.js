import React from 'react';
import {Button,Modal,Toast} from 'antd-mobile';
import { Link } from 'dva/router';
import ListSort from './ListSort';
import styles from './editBigType.less';
const alert = Modal.alert;
const prompt = Modal.prompt;


class EditBigTypeMain extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }

    }

    onDelType(id){
        alert('确认删除','',[{text:'取消'},{text:'确认',onPress:this.onDel.bind(this,id)}])
    }

    onDel(id){
        const {onDelType} = this.props;
        onDelType(id)
    }

    onEditType(id,name){
        prompt('修改大类','',[{text:'取消'},{text:'确认',onPress: this.onEditBigPress.bind(this,id)}],'default',name)
    }

    onEditBigPress(id,value){
        const {onUpdateType} = this.props;
        console.log('value',value)
      if(value.replace(/\s+/g,"")){
        value = value.replace(/^\s+|\s+$/g,"");
        onUpdateType(id,value)
      } else {
        Toast.fail('大类名称为空,修改失败!!', 0.8)
      }
    }

    onChange(data){
        console.log(data)
    }

    render(){
        const {categoryList} = this.props;
        return (
            <div className={styles.editBigTypeMain}>
                <ul>
                    <ListSort
                        dragClassName="list-drag-selected"
                        appearAnim={{ animConfig: { marginTop: [5, 30], opacity: [1, 0] } }}
                        onChange={this.onChange}
                    >
                        {
                            categoryList.map((data,index) => {
                                return (
                                    <li key={index}>
                                        <div className="left"><img src={require('../../assets/delete.png')} onClick={this.onDelType.bind(this,data.Id)} alt=""/><span>{data.Name}</span></div>
                                        <div className="right"><img src={require('../../assets/edit.png')} onClick={this.onEditType.bind(this,data.Id,data.Name)} alt=""/><img src={require('../../assets/sort.png')} alt=""/></div>
                                    </li>
                                )
                            })
                        }
                    </ListSort>

                </ul>

                <div className="hint">点击左边删除</div> 
                {/* <div className="hint">点击左边删除，按住类别排序</div> */}
            </div>
        )
    }
}


export default EditBigTypeMain
