import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Popup, List, Checkbox, Icon, InputItem} from 'antd-mobile'
import styles from './PopupCommission.less'
import {createForm} from 'rc-form'

class popupCommissionModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            type: this.props.type,
            value: this.props.value
        }
    }
    
    onClose = () => {
        const { onClose } = this.props;
        onClose();
    };

    onSubmit = () => {
        const { onSubmit, form: {getFieldsValue}} = this.props;
        const data= getFieldsValue()
        const value = data[`type${this.state.type}`]
        onSubmit({type: this.state.type, value:  value == undefined ? '0' : value});
    };

    renderHeader = () => {
        const { title } = this.props;
        return (
            <div>
                <div className="cancel" onClick={this.onClose}>
                    取消
                </div>
                <div className="title">{title}</div>
                <div className="affirm" onClick={this.onSubmit}>
                    确认
                </div>
            </div>
        );
    };

    onSelect = (type) => {
        this.setState({ type })
    }

    render() {
        let { type, value } = this.props
        if(Number(value) == 0){
            value = undefined
        }
        
        const { getFieldProps } = this.props.form;
        return <div className={styles.popupMoadl}>
                    <List renderHeader={this.renderHeader}
                        className="popup-list">
                        <InputItem
                            type="money"
                            extra="%"
                            placeholder="0"
                            {...getFieldProps("type1", {
                                initialValue: type == 1 ? value : undefined,
                                normalize: (v, prev) => {
                                    if (v && !/^(100|[1-9][0-9]|[1-9])(\.\d{0,2}?)?$/.test(v)) {
                                      if (v === '.') {
                                        return '0.';
                                      }
                                      return prev;
                                    }
                                    return v;
                                  },
                            })}>
                            <Checkbox key={1} checked={this.state.type == 1}
                                onChange={this.onSelect.bind(this, 1)}><span style={{width: '1.4rem'}}>按比例</span></Checkbox>
                        </InputItem>
                        <InputItem
                            type="money"
                            extra="¥"
                            placeholder="0.00"
                            {...getFieldProps('type0', {
                                initialValue: type == 0 ? value : undefined,
                                normalize: (v, prev) => {
                                  if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                                    if (v === '.') {
                                      return '0.';
                                    }
                                    return prev;
                                  }
                                  return v;
                                },
                              })}>
                            <Checkbox key={1} checked={this.state.type == 0}
                                onChange={this.onSelect.bind(this, 0)}><span style={{width: '1.4rem'}}>固定金额</span></Checkbox>
                        </InputItem>
                    </List>
                </div>;
    }
}

popupCommissionModal.propTypes = {

};

export default createForm()(popupCommissionModal);