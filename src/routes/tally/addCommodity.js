import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {routerRedux} from 'dva/router'
import Header from '../../components/layout/header.jsx';
import AddManageListMain from '../../components/tally/addCommodity';
import {ActivityIndicator} from 'antd-mobile'


const AddCommodity = ({location, dispatch, tally, loading}) => {

  const {leftData, commoditysClass, commodityName, companys,companyName,QRCode} = tally;

  const addManageListProps = {
    leftData,
    commoditysClass,
    commodityName,
    companyName,
    companys,
    QRCode,
    submitName(id, name) {
      dispatch({
        type: 'tally/saveCommodityName',
        payload: {id, name}
      })
    },
    onSubmit(value, files) {
      dispatch({
        type: 'tally/addCommodity',
        payload: {
          value,
          files
        }
      })
    },
    submitComCard(id, name) {
      dispatch({
        type: 'tally/changeComName',
        payload: {id, name}
      })
    },
    saveQRCode(value){
      dispatch({
        type: 'tally/saveQRCode',
        payload: value
      })
    }
  }

  const headerProps = {
    title: "新增商品",
    onLeftClick() {
      dispatch(routerRedux.goBack())
    },
  }

  return (
    <div>
      <ActivityIndicator
        toast
        text="正在加载"
        animating={loading.models.tally}
      />
      <Header {...headerProps}></Header>
      <AddManageListMain {...addManageListProps}></AddManageListMain>
    </div>
  )
}

AddCommodity.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  tally: PropTypes.object
};

function mapStateToProps({tally, loading}) {
  return {tally, loading}
}

export default connect(mapStateToProps)(AddCommodity)
