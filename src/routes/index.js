import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import { routerRedux } from 'dva/router'
import Header from '../components/layout/header';
import IndexMain from '../components/index/index';
import {Icon,Popup} from 'antd-mobile'
import PopupModal from './popupUserModal'
import Cookie from 'js-cookie'
import styles from './index.less'

const Index = ({location,dispatch,index}) => {

    const {indexData,hospitalInfo} = index;

    var shortName = '宠物店';
    if(hospitalInfo){
      shortName = hospitalInfo.Name;
    }

    const onChangeUser = ()=>{
      var dataList = [];
      dataList.push({id:1,name:'退出'})
      const popupProps = {
        dataList:dataList,
        title: '切换账户',
        onLoginout() {
          dispatch(routerRedux.push({
            pathname:'/login'
          }))
          Cookie.remove('token',{path:''});
          Popup.hide();
        },
        onClose() {
          Popup.hide();
        }
      }
      Popup.show(<div>
        <PopupModal {...popupProps}/>
      </div>, {animationType: 'slide-up'});
  }


  const headerProps = {
        title:  <div className={styles.headerContent}>    
                    <img src={require("../assets/logo_icon.png")} alt=""/>
                    {shortName && shortName.substring(0,12)}
                    <span><Icon type='down' onClick={onChangeUser}/></span>
                </div>,
        headerState:false,
        onLeftClick(){

        }
    }

    const indexProps = {
        indexData
    }


    return (
        <div>
            <Header {...headerProps}></Header>
            <IndexMain {...indexProps}></IndexMain>
        </div>
    )
}

Index.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    index:PropTypes.object
};

function mapStateToProps({index}){
    return {index}
}

export default connect(mapStateToProps)(Index)
