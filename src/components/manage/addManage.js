import React from "react";
import {
    Button,
    List,
    InputItem,
    ImagePicker,
    Icon,
    Popup,
    Toast,
    Tabs
} from "antd-mobile";
import { Link } from "dva/router";
import { createForm } from "rc-form";
import styles from "./addManage.less";
import PopupModal from "./popupModal";
import PopupMoreModal from "./popupMoreModal";
import PopupCommission from "./commission/PopupCommission";
import Pinyin from "../../utils/pinyin";

const pinyin = new Pinyin();
pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
const Item = List.Item;
const TabPane = Tabs.TabPane;

class AddManageListMain extends React.Component {
    constructor(props) {
        super(props);
        const { editData, categoryList, companys } = this.props;
        var activeKey = "";
        categoryList.forEach((data, index) => {
            if (data.Id == editData.father_Category_id) {
                activeKey = index + "";
            }
        });

        this.state = {
            activeKey: activeKey ? activeKey : "0",
            files: editData.CommodityImg
                ? [{ url: editData.CommodityImg }]
                : [],
            activeKeyDefault: activeKey,
            commodityNameDefauly: editData.Con_Category_Name,
            commodityName: editData.Con_Category_Name,
            /* companyNameDefauly:editData.Vender,
      companyName:editData.Vender,*/
            companysDefault: editData.Company ? editData.Company : [],
            companys: editData.Company ? editData.Company : [],
            companyDefaults: companys,
            ServiceCommissionMoney: editData.ServiceCommissionMoney,
            ServiceCommissionType: editData.ServiceCommissionType
                ? editData.ServiceCommissionType
                : 0,
            SaleCommissionMoney: editData.SaleCommissionMoney,
            SaleCommissionType: editData.SaleCommissionType
                ? editData.SaleCommissionType
                : 0
        };
    }

    onTabClick(key) {
        const { categoryList, clearCommodity, getTypeClass } = this.props;
        this.setState({
            activeKey: key
        });
        clearCommodity();
        if (this.state.activeKeyDefault == key) {
            this.setState({
                commodityName: this.state.commodityNameDefauly,
                companys: this.state.companysDefault
            });
        } else {
            this.setState({
                commodityName: "",
                companys: []
            });
        }
        getTypeClass(categoryList[key].Id, key, categoryList[key].Name);
    }

    onChange(files, type, index) {
        this.setState({
            files
        });
    }

    onChangeType() {
        var obj = this;
        const { dataList, submitCard } = this.props;
        const popupProps = {
            title: "商品分类",
            dataList: dataList,
            onSubmit(id, name) {
                obj.setState({
                    commodityName: name
                });
                submitCard(id, name);
                Popup.hide();
            },
            onClose() {
                Popup.hide();
            }
        };
        Popup.show(
            <div>
                <PopupModal {...popupProps} />
            </div>,
            { animationType: "slide-up" }
        );
    }

    onSaleCommissionChange() {
        this.handleChangeCommission(
            "Sale",
            "销售提成",
            this.state.SaleCommissionType,
            this.state.SaleCommissionMoney
        );
    }

    onServiceCommissionChange() {
        this.handleChangeCommission(
            "Service",
            "服务提成",
            this.state.ServiceCommissionType,
            this.state.ServiceCommissionMoney
        );
    }

    handleChangeCommission(key, title, type, value) {
        var obj = this;
        const { submitComCard } = this.props;

        const popupProps = {
            title,
            type,
            value,
            onSubmit(data) {
                obj.setState({
                    [`${key}CommissionMoney`]: data.value,
                    [`${key}CommissionType`]: data.type
                });
                Popup.hide();
            },
            onClose() {
                Popup.hide();
            }
        };

        Popup.show(<PopupCommission {...popupProps} />);
    }

    onChangeCom() {
        var obj = this;
        const { submitComCard } = this.props;
        const companys = this.state.companyDefaults;

        var selectCompanys = obj.state.companys;
        var newCompanys = [];
        if (companys.length > 0) {
            companys.forEach(item => {
                var flag = false;
                for (var i = 0; i < selectCompanys.length; i++) {
                    if (item.Id == selectCompanys[i].G_Company_Mid) {
                        flag = true;
                    }
                }
                if (flag) {
                    item.checked = true;
                }
                newCompanys.push(item);
            });
        }

        const popupProps = {
            title: "供应商",
            dataList: newCompanys,
            onSubmit(companys, dataList) {
                var arr = [];
                var arr2 = [];
                if (companys.length > 0) {
                    companys.forEach(item => {
                        arr.push(item.G_Company_Mid);
                        arr2.push(item.G_Company_Name);
                    });
                }
                var name = arr2.join(",");
                var id = arr.join(",");
                obj.setState({
                    companys: companys,
                    companyDefaults: dataList
                });
                submitComCard(id, name, companys);
                Popup.hide();
            },
            onClose() {
                Popup.hide();
            }
        };
        Popup.show(
            <div>
                <PopupMoreModal {...popupProps} />
            </div>,
            { animationType: "slide-up" }
        );
    }

    onSubmit() {
        const { validateFields } = this.props.form;
        const { onSubmit, editData } = this.props;
        const { files, companys } = this.state;
        validateFields((error, value) => {
            var name = value.Name;
            var namePy = "";
            if (name && name.length > 0) {
                namePy = pinyin.getCamelChars(name);
            }

            const info = {
                ...value,
                NamePy: namePy,
                CommodityImg:
                    files[0] && files[0].url ? files[0].url : undefined,
                Company: companys,
                IsStock: editData.IsStock ? editData.IsStock : "1",
                ServiceCommissionType: this.state.ServiceCommissionType,
                ServiceCommissionMoney: this.state.ServiceCommissionMoney,
                SaleCommissionType: this.state.SaleCommissionType,
                SaleCommissionMoney: this.state.SaleCommissionMoney
            };

            if (value.MemberPrice > 0) {
                info.IsMemberPrice = editData.IsMemberPrice
                    ? editData.IsMemberPrice
                    : "1";
            }

            if (files.length > 0 && files[0].file) {
                if (files[0].file.size < 100000) {
                    const formdata = new FormData();
                    formdata.append("file-demo", files[0].file);
                    onSubmit(info, formdata);
                    return
                } else {
                    Toast.info("图片大小不能超过100KB", 0.8);
                }
            }

            onSubmit(info);
        });
    }

    getCommission(type, value) {
        const num = Number(value);
        let valueNum = isNaN(num) ? 0 : num;
        return `${type == 0 ? valueNum.toFixed(2) : valueNum}${
            type == 0 ? "¥" : "%"
        }`;
    }

    onGetCode(){
        const {saveQRCode} = this.props;
        window.wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success (res) {
                    const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    var data = '';
                    if(result.indexOf(',') == -1){
                        data = result;
                    }else{
                        data = result.split(',')[1]
                    }
                    saveQRCode(data)
                }
          })
    }

    render() {
        const { files, activeKey, commodityName, companys } = this.state;
        const { getFieldProps } = this.props.form;
        const { editData, categoryList,QRCode } = this.props;
        var companyNames = [];
        if (companys.length > 0) {
            companys.forEach(item => {
                companyNames.push(item.G_Company_Name);
            });
        }
        companyNames = companyNames.join(",");
        return (
            <div className={styles.addManageListMain}>
                <div className="card_type">
                    <p>
                        请选择商品类型<img
                            src={require("../../assets/jieshi.png")}
                            alt=""
                        />
                    </p>
                    <div className="type_content">
                        <Tabs
                            onTabClick={this.onTabClick.bind(this)}
                            activeKey={activeKey}
                        >
                            {categoryList.map((data, index) => {
                                return (
                                    <TabPane
                                        key={index}
                                        tab={
                                            <div>
                                                <div className="icon" />
                                                <div className="text">
                                                    {data.Name}
                                                </div>
                                            </div>
                                        }
                                    />
                                );
                            })}
                        </Tabs>
                    </div>
                </div>

                <div className="manage_list">
                    <List>
                        <InputItem
                            placeholder="输入条码"
                            extra={
                                <div
                                    className="com"
                                    onClick={this.onGetCode.bind(this)}
                                >
                                    <img src={require('../../assets/searchCode.png')} />
                                </div>
                            }
                            {...getFieldProps("EnCode", {
                                initialValue: QRCode ? QRCode : editData.EnCode,
                                normalize: (v, prev) => {
                                    if (v && v.replace(/\s+/g, "")) {
                                        return v;
                                    } else {
                                        return "";
                                    }
                                }
                            })}
                        >
                            条码
                        </InputItem>
                        <InputItem
                            placeholder="点击输入"
                            {...getFieldProps("Name", {
                                initialValue: editData.Name,
                                normalize: (v, prev) => {
                                    if (v && v.replace(/\s+/g, "")) {
                                        return v;
                                    } else {
                                        return "";
                                    }
                                }
                            })}
                            className="must"
                        >
                            商品名称
                        </InputItem>
                        <Item
                            className="must"
                            extra={
                                <div
                                    className="com"
                                    onClick={this.onChangeType.bind(this)}
                                >
                                    {commodityName ? commodityName : "点击选择"}
                                    <Icon type="down" color="#108EE9" />
                                </div>
                            }
                        >
                            商品分类
                        </Item>
                        <InputItem
                            placeholder="点击输入"
                            {...getFieldProps("Format", {
                                initialValue: editData.Format,
                                normalize: (v, prev) => {
                                    if (v && v.replace(/\s+/g, "")) {
                                        return v;
                                    } else {
                                        return "";
                                    }
                                }
                            })}
                        >
                            商品规格
                        </InputItem>
                        <InputItem
                            placeholder="点击输入"
                            {...getFieldProps("Unit", {
                                initialValue: editData.Unit,
                                normalize: (v, prev) => {
                                    if (v && v.replace(/\s+/g, "")) {
                                        return v;
                                    } else {
                                        return "";
                                    }
                                }
                            })}
                        >
                            商品单位
                        </InputItem>
                        <InputItem
                            type="money"
                            placeholder="￥0.00"
                            {...getFieldProps("BuyPrice", {
                                initialValue: editData.BuyPrice
                            })}
                        >
                            商品进价
                        </InputItem>
                        <InputItem
                            type="money"
                            placeholder="￥0.00"
                            {...getFieldProps("SalePrice", {
                                initialValue: editData.SalePrice
                            })}
                        >
                            商品单价
                        </InputItem>
                        <InputItem
                            type="money"
                            placeholder="￥0.00"
                            {...getFieldProps("MemberPrice", {
                                initialValue: editData.MemberPrice
                            })}
                        >
                            会员价
                        </InputItem>
                        <Item
                            extra={
                                <div
                                    className="com"
                                    onClick={this.onServiceCommissionChange.bind(
                                        this
                                    )}
                                >
                                    {this.state.ServiceCommissionType ==
                                    undefined
                                        ? "点击输入"
                                        : this.getCommission(
                                              this.state.ServiceCommissionType,
                                              this.state.ServiceCommissionMoney
                                          )}
                                    <Icon type="down" color="#108EE9" />
                                </div>
                            }
                        >
                            服务提成
                        </Item>
                        <Item
                            extra={
                                <div
                                    className="com"
                                    onClick={this.onSaleCommissionChange.bind(
                                        this
                                    )}
                                >
                                    {this.state.SaleCommissionType == undefined
                                        ? "点击输入"
                                        : this.getCommission(
                                              this.state.SaleCommissionType,
                                              this.state.SaleCommissionMoney
                                          )}
                                    <Icon type="down" color="#108EE9" />
                                </div>
                            }
                        >
                            销售提成
                        </Item>
                        {/* <InputItem
              type='money'
              placeholder="￥0.00"
              {...getFieldProps('ServiceCommission', {
                initialValue: editData.ServiceCommissionMoney
              })}
            >
              服务提成
            </InputItem>
            <InputItem
              type='money'
              placeholder="￥0.00"
              {...getFieldProps('SaleCommission', {
                initialValue: editData.SaleCommissionMoney
              })}
            >
              销售提成
            </InputItem> */}
                        <InputItem
                            placeholder="0"
                            type="money"
                            {...getFieldProps("Number", {
                                initialValue: editData.Number
                            })}
                        >
                            库存
                        </InputItem>

                        <Item
                            extra={
                                <div
                                    className="com"
                                    onClick={this.onChangeCom.bind(this)}
                                >
                                    {companyNames ? companyNames : "点击选择"}
                                    <Icon type="down" color="#108EE9" />
                                </div>
                            }
                        >
                            供应商
                        </Item>

                        <InputItem
                            placeholder="点击输入"
                            {...getFieldProps("Discription", {
                                initialValue: editData.Discription,
                                normalize: (v, prev) => {
                                    if (v && v.replace(/\s+/g, "")) {
                                        return v;
                                    } else {
                                        return "";
                                    }
                                }
                            })}
                        >
                            备注
                        </InputItem>
                        <Item>
                            <div>
                                <div>上传图片</div>
                                <div>
                                    <ImagePicker
                                        files={files}
                                        onChange={this.onChange.bind(this)}
                                        selectable={files.length < 1}
                                    />
                                </div>
                            </div>
                        </Item>
                    </List>
                </div>

                <div className="hint">
                    <div className="hint_icon" />
                    <div className="hint_text">
                        更多商品信息请于电脑客户端完善
                    </div>
                </div>
                <div className="submit_fixed" />
                <div className="submit">
                    <Button type="primary" onClick={this.onSubmit.bind(this)}>
                        完成
                    </Button>
                </div>
            </div>
        );
    }
}

export default createForm()(AddManageListMain);
