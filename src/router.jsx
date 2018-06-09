import React from 'react';
import PropTypes from 'prop-types';
import {
  Router, Switch, Route
} from 'dva/router';
import Dynamic from 'dva/dynamic';

function RouterConfig({
  history, app
}) {
	const Index = Dynamic({
		app,
		models: () => [
			import('./models/index')
		],
		component: () => import('./routes/index')
	});

	const login = Dynamic({
		app,
		models: () => [
			import('./models/login')
		],
		component: () => import('./routes/login')
	});

	const register = Dynamic({
		app,
		models: () => [
			import('./models/register')
		],
		component: () => import('./routes/register/register')
	});

	const findPassword = Dynamic({
		app,
		models: () => [
			import('./models/register')
		],
		component: () => import('./routes/register/findPassword')
	});


	const tally = Dynamic({
		app,
		models: () => [
			import('./models/tally')
		],
		component: () => import('./routes/tally/tally')
	});

	const search = Dynamic({
		app,
		models: () => [
			import('./models/tally')
		],
		component: () => import('./routes/tally/search')
	});

	const searchCode = Dynamic({
		app,
		models: () => [
			import('./models/tally')
		],
		component: () => import('./routes/tally/searchCode')
	});
  
	const affirmOrder = Dynamic({
		app,
		models: () => [
			import('./models/tally')
		],
		component: () => import('./routes/tally/affirmOrder')
	});

	const payType = Dynamic({
		app,
		models: () => [
			import('./models/tally')
		],
		component: () => import('./routes/tally/payType')
	});

	const orderSucceed = Dynamic({
		app,
		models: () => [
			import('./models/tally')
		],
		component: () => import('./routes/tally/orderSucceed')
	});

	const vipList = Dynamic({
		app,
		models: () => [
			import('./models/vip')
		],
		component: () => import('./routes/vip/vipList')
	});

	const addVip = Dynamic({
		app,
		models: () => [
			import('./models/vip')
		],
		component: () => import('./routes/vip/addVip')
	});

	const vipCard = Dynamic({
		app,
		models: () => [
			import('./models/vip')
		],
		component: () => import('./routes/vip/vipCard')
	});

	const vipRefill = Dynamic({
		app,
		models: () => [
			import('./models/vip')
		],
		component: () => import('./routes/vip/vipRefill')
	});

	const manageList = Dynamic({
		app,
		models: () => [
			import('./models/manage')
		],
		component: () => import('./routes/manage/manageList')
	});

	const addManage = Dynamic({
		app,
		models: () => [
			import('./models/manage')
		],
		component: () => import('./routes/manage/addManage')
	});

	const manageType = Dynamic({
		app,
		models: () => [
			import('./models/manage')
		],
		component: () => import('./routes/manage/manageType')
	});

	const editBigType = Dynamic({
		app,
		models: () => [
			import('./models/manage')
		],
		component: () => import('./routes/manage/editBigType')
	});

	const editType = Dynamic({
		app,
		models: () => [
			import('./models/manage')
		],
		component: () => import('./routes/manage/editType')
	});

	const searchSell = Dynamic({
		app,
		models: () => [
			import('./models/searchSell')
		],
		component: () => import('./routes/searchSell/searchSell')
	});

	const orderDetails = Dynamic({
		app,
		models: () => [
			import('./models/searchSell')
		],
		component: () => import('./routes/searchSell/orderDetails')
	});


	const other = Dynamic({
		app,
		models: () => [
			import('./models/other')
		],
		component: () => import('./routes/other/other')
	});


	const addBill = Dynamic({
		app,
		models: () => [
			import('./models/other')
		],
		component: () => import('./routes/other/addBill')
	});

	const make = Dynamic({
		app,
		models: () => [
			import('./models/make')
		],
		component: () => import('./routes/make/make')
	});


	const addMake = Dynamic({
		app,
		models: () => [
			import('./models/make')
		],
		component: () => import('./routes/make/addMake')
	});

	const goodsList = Dynamic({
		app,
		models: () => [
			import('./models/tally')
		],
		component: () => import('./routes/tally/goodsList')
	});

	const addCommodity = Dynamic({
		app,
		models: () => [
			import('./models/tally')
		],
		component: () => import('./routes/tally/addCommodity')
	});

	const system = Dynamic({
		app,
		models: () => [
			import('./models/system')
		],
		component: () => import('./routes/system/system')
	});

	const storeAffirm = Dynamic({
		app,
		models: () => [
			import('./models/system')
		],
		component: () => import('./routes/system/storeAffirm')
	});

	const contact = Dynamic({
		app,
		models: () => [
			import('./models/system')
		],
		component: () => import('./routes/system/contact')
	});

	const setPrint = Dynamic({
		app,
		models: () => [
			import('./models/system')
		],
		component: () => import('./routes/system/setPrint')
	});

	const setIntegral = Dynamic({
		app,
		models: () => [
			import('./models/system')
		],
		component: () => import('./routes/system/setIntegral')
	});

	const vipManage = Dynamic({
		app,
		models: () => [
			import('./models/system')
		],
		component: () => import('./routes/system/vipManage')
	});

	const onceCardManage = Dynamic({
		app,
		models: () => [
			import('./models/system')
		],
		component: () => import('./routes/system/onceCardManage')
	});

	const setDiscount = Dynamic({
		app,
		models: () => [
			import('./models/system')
		],
		component: () => import('./routes/system/setDiscount')
	});

	const setRemind = Dynamic({
		app,
		models: () => [
			import('./models/system')
		],
		component: () => import('./routes/system/setRemind')
	});

	const setWechat = Dynamic({
		app,
		models: () => [
			import('./models/system')
		],
		component: () => import('./routes/system/setWechat')
	});

	const staffManage = Dynamic({
		app,
		models: () => [
			import('./models/system')
		],
		component: () => import('./routes/system/staffManage')
	});

	const power = Dynamic({
		app,
		models: () => [
			import('./models/system')
		],
		component: () => import('./routes/system/power')
	});

	const company = Dynamic({
		app,
		models: () => [
			import('./models/system')
		],
		component: () => import('./routes/system/company')
	});

	const vipDetail = Dynamic({
		app,
		models: () => [
			import('./models/vip')
		],
		component: () => import('./routes/vip/vipDetail')
	});
	
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/login" component={login} />
        <Route exact path="/register" component={register} />
        <Route exact path="/findPassword" component={findPassword} />
        <Route exact path="/tally" component={tally} />{/*收银*/}
        <Route exact path="/tally/search" component={search} />
        <Route exact path="/tally/searchCode" component={searchCode} />
        <Route exact path="/tally/affirmOrder" component={affirmOrder} />
        <Route exact path="/tally/payType" component={payType} />
        <Route exact path="/tally/orderSucceed" component={orderSucceed} />
        <Route exact path="/tally/goodsList" component={goodsList} />
        <Route exact path="/tally/addCommodity" component={addCommodity} />
        <Route exact path="/vipList" component={vipList} />{/*会员*/}
        <Route exact path="/vipList/addVip" component={addVip} />
        <Route exact path="/vipList/vipCard" component={vipCard} />
        <Route exact path="/vipList/vipRefill" component={vipRefill} />
        <Route exact path="/manageList" component={manageList} />{/*管理*/}
        <Route exact path="/manageList/addManage" component={addManage} />{/*添加商品*/}
        <Route exact path="/manageList/manageType" component={manageType} />{/*商品分类*/}
        <Route exact path="/manageList/editBigType" component={editBigType} />{/*编辑大类*/}
        <Route exact path="/manageList/editType" component={editType} />{/*编辑类别*/}
        <Route exact path="/searchSell" component={searchSell} />{/*查询销售*/}
        <Route exact path="/searchSell/orderDetails" component={orderDetails} />{/*订单详情*/}
        <Route exact path="/other" component={other} />{/*其他收支*/}
        <Route exact path="/other/addBill" component={addBill} />{/*新增收支*/}
        <Route exact path="/make" component={make} />{/*预约服务*/}
        <Route exact path="/make/addMake" component={addMake} />{/*新增预约*/}
        <Route exact path="/system" component={system} />{/*系统设置*/}
        <Route exact path="/system/storeAffirm" component={storeAffirm} />{/*店铺认证*/}
        <Route exact path="/system/contact" component={contact} />{/*联系我们*/}
        <Route exact path="/system/setPrint" component={setPrint} />{/*打印设置*/}
        <Route exact path="/system/setIntegral" component={setIntegral} />{/*积分设置*/}
        <Route exact path="/system/vipManage" component={vipManage} />{/*会员卡管理*/}
        <Route exact path="/system/onceCardManage" component={onceCardManage} />{/*次卡管理*/}
        <Route exact path="/system/setDiscount" component={setDiscount} />{/*折扣设置*/}
        <Route exact path="/system/setRemind" component={setRemind} />{/*提醒设置*/}
        <Route exact path="/system/setWechat" component={setWechat} />{/*微信设置*/}
        <Route exact path="/system/staffManage" component={staffManage} />{/*员工管理*/}
        <Route exact path="/system/staffManage/power" component={power} />{/*员工权限设置*/}
		<Route exact path="/system/company" component={company} />{/*往来单位*/}
		
        <Route exact path="/vipList/vipDetail" component={vipDetail} />{/*会员详情*/}
      </Switch>
    </Router>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired
};

export default RouterConfig;
