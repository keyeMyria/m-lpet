import React from 'react';
import {Popup, List, Checkbox, Icon} from 'antd-mobile'
import styles from './popupmodal.less'

const CheckboxItem = Checkbox.CheckboxItem;

class PopupMoreModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      typeActive: true,
      popupIndex: 0,
      companys: [],
      dataList: []
    }

  }

  componentDidMount() {
    const {dataList} = this.props
    var newcompanys = [];
    if (dataList.length > 0) {
      dataList.forEach(item => {
        if (item.checked) {
          newcompanys.push({G_Company_Mid: item.Id, G_Company_Name: item.Name, Price: 0})
        }
      })
    }

    this.setState({
      companys: newcompanys,
      dataList: dataList
    })
  }

  renderHeader = () => {
    const {title} = this.props;
    return (
      <div>
        <div className="cancel" onClick={this.onClose}>取消</div>
        <div className="title">{title}</div>
        <div className="affirm" onClick={this.onSubmit}>确认</div>
      </div>
    )
  };

  onClose = () => {
    const {onClose} = this.props;
    onClose();
  }

  onSubmit = () => {
    const {onSubmit} = this.props;
    onSubmit(this.state.companys, this.state.dataList)
  }

  onSelect = (id, name, obj) => {
    var checked = obj.target.checked;
    var flag = true;
    var companys = this.state.companys;
    var _companys = [];
    if (companys.length > 0) {
      companys.forEach((item) => {
        if (item.G_Company_Mid == id) {
          flag = false;
        } else {
          _companys.push({G_Company_Mid: item.G_Company_Mid, G_Company_Name: item.G_Company_Name, Price: 0})
        }
      })
      if (flag) {
        _companys.push({G_Company_Mid: id, G_Company_Name: name, Price: 0})
      }
    } else {
      _companys.push({G_Company_Mid: id, G_Company_Name: name, Price: 0})
    }

    const {dataList} = this.props;
    var _dataList = [];
    if (dataList.length > 0) {
      dataList.forEach(item => {
        if (checked && item.Id == id) {
          item.checked = true;
          _dataList.push(item)
        } else if (!checked && item.Id == id) {
          item.checked = false;
          _dataList.push(item)
        } else {
          _dataList.push(item)
        }
      })
    }

    this.setState({
      companys: _companys,
      dataList: _dataList
    })
  }


  render() {
    const {popupIndex, dataList} = this.state;
    //const {dataList} = this.props;
    return (
      <div className={styles.popupMoadl}>
        {/*<List renderHeader={this.renderHeader}
                className="popup-list"
                >
                    {dataList.map((data, index) => (
                        <List.Item
                            key={index}
                            className={popupIndex == index ? 'active' : ''}
                            onClick={this.onSelect.bind(null,index)}
                            >{data.Name}</List.Item>
                    ))}
                </List>*/}
        <List renderHeader={this.renderHeader}
              className="popup-list">
          {dataList.map(i => (
            <CheckboxItem key={i.Id} checked={i.checked ? true : false}
                          onChange={this.onSelect.bind(this, i.Id, i.Name)}>
              {i.Name}
            </CheckboxItem>
          ))}
        </List>

      </div>
    )
  }
}


export default PopupMoreModal
