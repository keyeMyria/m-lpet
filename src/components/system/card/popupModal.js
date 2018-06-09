import React from 'react';
import {List,Icon} from 'antd-mobile'
import styles from './popupModal.less'

class PopupModal extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            popupIndex:0,
        }

    }

    
    renderHeader = () => {
        return (
            <div>
                <div className="title">员工职位</div>
                <Icon type="cross" onClick={this.onClose}/>
            </div>
        )
    };
    
    onClose = () => {
        const {onClose} = this.props;
        onClose();
    }


    onSelect = (index) => {
        const {onSubmit,dataList} = this.props;
        const {Id,Name} = dataList[this.state.popupIndex]
        this.setState({
            popupIndex:index
        })
        onSubmit(Id,Name)
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
                        <List.Item 
                            key={index} 
                            className={popupIndex == index ? 'active' : ''} 
                            onClick={this.onSelect.bind(null,index)}
                            extra={
                                popupIndex == index ? <Icon type="check" /> : ''
                            }
                            >
                            {data.Name}
                            
                        </List.Item>
                    ))}
                </List>
            </div>
        )
    }
}


export default PopupModal