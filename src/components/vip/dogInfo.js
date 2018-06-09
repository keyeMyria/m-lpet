import React from 'react';
import { List, InputItem, Checkbox, DatePicker } from 'antd-mobile';
const Item = List.Item;


const CustomChildren = props => (
    <div
        onClick={props.onClick}
        className="time_content"
    >
        {props.children}
        <div>
            {props.extra}
            <div className="time"></div>
        </div>
    </div>
);

class DogInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }

    onChecked(id, value) {
        const { onChecked } = this.props;
        onChecked(id, value)
    }


    onRemovePet(index) {
        const { onRemovePet } = this.props;
        if(index != 0){
            onRemovePet(index)
        }
    }

    onDatePicker(id, value) {
        //宠物年龄
        const { onDatePicker } = this.props;
        onDatePicker(id, value)
    }

    onChangeDogName(id, value) {
        const { onChangeDogName } = this.props;
        onChangeDogName(id, value)
    }

    onChangeRemark(id,value){
        const {onChangeRemark} = this.props;
        onChangeRemark(id,value)
    }

    render() {
        const { data, index } = this.props;
        return (
            <div>
                <div className="info_container" data={data}>
                    <div className="dog_info">
                        <div className="info_header">
                            <div className="info_name">宠物信息</div>
                            <div className={`${index != 0 && 'icon'}`} onClick={this.onRemovePet.bind(this, index)}></div>
                        </div>
                        <div className="info_content">
                            <InputItem
                                placeholder="输入宠物姓名"
                                onChange={this.onChangeDogName.bind(this, data.id)}
                                extra={
                                    <div>
                                        <Checkbox checked={data.PetSex == '公'} onChange={this.onChecked.bind(this, data.id, 'gong')}>公</Checkbox>
                                        <Checkbox checked={data.PetSex == '母'} onChange={this.onChecked.bind(this, data.id, 'mu')}>母</Checkbox>
                                    </div>

                                }
                            >
                            </InputItem>

                            <Item
                                extra={
                                    <div>
                                        <Checkbox checked={data.Category == '1000000000000000'} onChange={this.onChecked.bind(this, data.id, 1)}>猫</Checkbox>
                                        <Checkbox checked={data.Category == '1000000000000001'} onChange={this.onChecked.bind(this, data.id, 2)}>犬</Checkbox>
                                        <Checkbox checked={data.Category == '1000000000000002'} onChange={this.onChecked.bind(this, data.id, 3)}>其他</Checkbox>
                                    </div>

                                }
                            >
                                宠物类型
                                </Item>

                            <DatePicker
                                mode="date"
                                title="选择日期"
                                value={data.Birthday}
                                extra="点击选择"
                                onChange={this.onDatePicker.bind(this, data.id)}
                            >
                                <CustomChildren>宠物年龄</CustomChildren>
                            </DatePicker>


                            <Item>
                                <div>
                                    <Checkbox checked={data.Sterilized == 1} onChange={this.onChecked.bind(this, data.id, 4)}>已绝育</Checkbox>
                                    <Checkbox checked={data.Immunity == 1} onChange={this.onChecked.bind(this, data.id, 5)}>已免疫</Checkbox>
                                    <Checkbox checked={data.IsInsecticide == 1} onChange={this.onChecked.bind(this, data.id, 6)}>已驱虫</Checkbox>
                                    <Checkbox checked={data.Dead == 1} onChange={this.onChecked.bind(this, data.id, 7)}>已死亡</Checkbox>
                                </div>
                            </Item>
                            <InputItem
                                placeholder="备注"
                                onChange={this.onChangeRemark.bind(this,data.id)}
                            >
                            </InputItem>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default DogInfo