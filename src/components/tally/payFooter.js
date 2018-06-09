import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import styles from './payFooter.less';

function Footer({
	catNum,
    catTotal,
	onDownOrder
}) {
  return (
		<div>
			<div className={styles.normal}>
				<div className="left">
                    <div className="box">
                        <div className="icon">
                            合计：
                        </div>
                        <h2>￥{catTotal}</h2>
                    </div>
					
				</div>
				<div className={`right ${catNum == 0 ? '' : 'active'}`} onClick={ catNum == 0 ? '' : onDownOrder}>
					完成
				</div>
			</div>
			<div className={styles.footer}></div>
		</div>
		
  );
}

// Footer.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   location: PropTypes.object.isRequired
// };

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Footer);
