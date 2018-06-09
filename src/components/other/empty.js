import React from 'react';
import PropTypes from 'prop-types';
import styles from './empty.less'
import emptyImg from '../../assets/kong.png'

const emptyData = props => {
    return (
        <div className={styles.empty}>
            <img src={emptyImg}/> 
            <span>暂无数据</span>
        </div>
    );
};

emptyData.propTypes = {
    
};

export default emptyData;