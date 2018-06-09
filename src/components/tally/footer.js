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
  const handleOk = () => {
	  if(catNum > 0){
		onDownOrder()
	  }
  }

  return (
		<div>
			<div className={styles.normal}>
				<div className="left">
					<div className="icon">
                        合计：
					</div>
					<h2>￥{catTotal.toFixed(2)}</h2>
				</div>
				<div className={`right ${catNum == 0 ? '' : 'active'}`} onClick={handleOk}>
					提交订单
				</div>
			</div>
			<div className={styles.footer}></div>
		</div>
		
  );
}

// Footer.propTypes = {
//   onDownOrder: PropTypes.func.isRequired,
//   location: PropTypes.object.isRequired
// };

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Footer);
