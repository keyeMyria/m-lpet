import React from 'react';
import {Popup,List,Button,Icon} from 'antd-mobile'
import styles from './../components/manage/popupmodal.less'


class PopupMoadl extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        }

    }


    renderHeader = () => {
        const {title} = this.props;
        return (
            <div>
                <div className="cancel" onClick={this.onClose}>取消</div>
                <div className="title">{title}</div>
                <div className="affirm" onClick={this.onClose}>确定</div>
            </div>
        )
    };

  onClose = ()=>{
    const {onClose} = this.props;
    onClose();
  }

  onLoginout = () =>{
    const {onLoginout} = this.props;
    onLoginout();
  }

    render(){
      const {dataList} = this.props;
        return (
          <div className={styles.popupMoadl}>
              <List renderHeader={this.renderHeader}
                    className="popup-list"
              >
                {dataList.map((data, index) => (
                  <List.Item
                    key={index}
                    onClick={this.onLoginout}
                  >{data.name}</List.Item>
                ))}
              </List>
            </div>
        )
    }
}


export default PopupMoadl
