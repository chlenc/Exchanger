import React from 'react';
import Tooltip from '@components/Tooltip';
import styles from '@components/Form/styles.scss';

export default class PriceInfo extends  React.Component{
    render(): React.ReactNode {
        return <Tooltip placement="bottomRight" trigger="hover" align={{offset: [34, 0]}}
                        overlay={<div className={styles.captionFont}>
                        The price may change in time the transaction gets into the blockchain. To avoid an unfavorable exchange rate specify the acceptable ratio below.
                        </div>}
        >
                <div className={styles.btcHelpIcn}/>
        </Tooltip>;
    }
}
