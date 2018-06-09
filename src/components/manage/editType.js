import React from 'react';
import {Button, Modal, Toast} from 'antd-mobile';
import {Link} from 'dva/router';
import ListSort from './ListSort';
import styles from './editType.less';

const alert = Modal.alert;
const prompt = Modal.prompt;


class EditBigTypeMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}

  }

  onDelType(id, status) {
    alert('确认删除', '', [{text: '取消'}, {text: '确认', onPress: this.onDel.bind(this, id, status)}])
  }

  onDel(id, status) {
    const {onDel} = this.props;
    onDel(id, status)
  }

  onEditType(id, name) {
    prompt('修改大类', '', [{text: '取消'}, {text: '确认', onPress: this.onEditBigPress.bind(this, id)}], 'default', name)
  }

  onSmEditType(id, name) {
    prompt('修改类别', '', [{text: '取消'}, {text: '确认', onPress: this.onEditSmPress.bind(this, id)}], 'default', name)
  }

  onEditBigPress(id, value) {
    const {onEditBigPress} = this.props;
    if (value.replace(/\s+/g, "")) {
      value = value.replace(/^\s+|\s+$/g, "");
      onEditBigPress(id, value)
    } else {
      Toast.fail('大类名称为空,修改失败!!', 0.8)
    }
  }

  onEditSmPress(id, value) {
    const {onEditBigPress} = this.props;
    if (value.replace(/\s+/g, "")) {
      value = value.replace(/^\s+|\s+$/g, "");
      onEditBigPress(id, value)
    } else {
      Toast.fail('类别名称为空,修改失败!!', 0.8)
    }
  }

  onChange(data) {
    console.log(data)
  }

  render() {
    const {dataList, bigClassData} = this.props;
    return (
      <div className={styles.editTypeMain}>
        <div className="big_content">
          <div className="big_title">大类</div>
          <ul>
            <li>
              <div className="left"><img src={require('../../assets/delete.png')}
                                         onClick={this.onDelType.bind(this, bigClassData.Id, 'true')}
                                         alt=""/><span>{bigClassData.Name}</span></div>
              <div className="right"><img src={require('../../assets/edit.png')}
                                          onClick={this.onEditType.bind(this, bigClassData.Id, bigClassData.Name)}
                                          alt=""/></div>
            </li>
          </ul>
        </div>
        <div className="type_content">
          <div className="type_title">类别</div>
          <ul>
            <ListSort
              dragClassName="list-drag-selected"
              appearAnim={{animConfig: {marginTop: [5, 30], opacity: [1, 0]}}}
              onChange={this.onChange}
            >
              {
                dataList.map((data, index) => {
                  return (
                    <li key={index}>
                      <div className="left"><img src={require('../../assets/delete.png')}
                                                 onClick={this.onDelType.bind(this, data.Id)}
                                                 alt=""/><span>{data.Name}</span></div>
                      <div className="right"><img src={require('../../assets/edit.png')}
                                                  onClick={this.onSmEditType.bind(this, data.Id, data.Name)}
                                                  alt=""/><img src={require('../../assets/sort.png')} alt=""/></div>
                    </li>
                  )
                })
              }
            </ListSort>

          </ul>

        </div>

        <div className="hint">点击左边删除</div>
        {/* <div className="hint">点击左边删除，按住类别排序</div> */}
      </div>
    )
  }
}


export default EditBigTypeMain
