import React from 'react';
import {
  NavBar,Icon
} from 'antd-mobile';


import styles from './header.less';

function Header({
	onLeftClick,
  title,
	rightContent,
	onAddVip,
	headerState = true
}) {
  

  return (
		<div className={styles.normal}>
			<div className="header">
					<NavBar
						iconName={''}
						mode="light"
						onLeftClick={onLeftClick}
						leftContent={headerState ? <Icon color="#000" type='left' /> : ''}
						rightContent={[
							<div key="1" onClick={onAddVip}>
                {rightContent}
              </div>]}
					>
					{title}
				</NavBar>
			</div>

			<div className="header-fixed"></div>
		</div>
  );
}


export default Header;
