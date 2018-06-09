import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import styles from './footer.less';

function Footer({
	catNum,
  catTotal,
	onDownOrder
}) {
  return (
		<div>
			<div className={styles.normal}>
				<div className="left">
					<div className="icon">
						<img src={require("../../assets/shop.png")} alt=""/>
						{catNum == 0 ? '' : <span>{catNum}</span>}
					</div>
					<h2>￥{catTotal.toFixed(2)}</h2>
				</div>
				<div className={`right ${catNum == 0 ? '' : 'active'}`} onClick={catNum == 0 ? '' : onDownOrder}>
					下单
				</div>
			</div>
			<div className={styles.footer}></div>
		</div>
		
  );
}


function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Footer);
