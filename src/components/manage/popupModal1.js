import React from 'react';
import {Popup,List,Button,Icon} from 'antd-mobile'
import styles from './popupmodal.less'

class PopupMoadl extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            typeActive:true,
            popupIndex:'0-0',
            index:0,
            i:0
        }

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
        const {onSubmit,dataList} = this.props;
        const {Id,Name} = dataList[this.state.index].children[this.state.i]
        onSubmit(Id,Name)
    }

    onSelect = (index,i) => {
        this.setState({
            popupIndex:`${index}-${i}`,
            index,
            i
        })
    }


    render(){
        const {popupIndex} = this.state;
        const {dataList} = this.props;
        return (
            <div className={styles.popupMoadl}>
                
                    <List renderHeader={this.renderHeader}
                    className="popup-list"
                    >
                        {dataList.map((data, index) => (
                                <List
                                    key={index}
                                    renderHeader={data.Name}
                                    >
                                    {
                                       data.children ? data.children.map((children,i) => {
                                            return (
                                                <List.Item 
                                                    key={i} 
                                                    className={popupIndex == `${index}-${i}` ? 'active' : ''} 
                                                    onClick={this.onSelect.bind(null,index,i)}
                                                    >{children.Name}</List.Item>
                                            )
                                        }) : ''
                                    }
                                </List>
                        ))}
                    </List>
                
            </div>
        )
    }
}


export default PopupMoadl

