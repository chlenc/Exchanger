import React from 'react';
import styles from './styles.scss';
import Form from '@src/components/Form';
import SignBtn from '@components/SignBtn';
import AccountStore from '@stores/AccountStore';
import { inject, observer } from 'mobx-react';
import Avatar from '@components/Avatar';
import { DAPP_ADDRESS } from '@stores/DappStore';


interface IProps {
    accountStore?: AccountStore
}

@inject('accountStore')
@observer
export default class Head extends React.Component<IProps> {

    render(): React.ReactNode {
        const {wavesKeeperAccount} = this.props.accountStore!;
        return <div className={styles.bg}>
            <div className={styles.h}>
                <div className={styles.header}>
                    <div className={styles.header_logoFont}></div>
                    {
                        wavesKeeperAccount
                            ? <div className={styles.header_sign}>
                                <Avatar className={styles.header_avatar} address={wavesKeeperAccount.address}/>
                                {wavesKeeperAccount.address}
                            </div>
                            : <SignBtn className={styles.header_sign}>
                                
                                Log in
                            </SignBtn>
                    }
                </div>
                <div className={styles.body}>
                    <div className={styles.info}>
                    <div className={styles.header_logoFont}><h2>Exchanger with constant liquidity</h2>
                    <h3>How does it work:</h3>
                    
                    1. Exchanger-dApp has two types of tokens, their ratio is the current exchange rate<br /><br />
                    2. dApp keeps the constant product of tokens' amount<br /><br />
                    3. The amount of tokens that you receive depends on your payment and it's calculated according to point 2<br /><br />
                    
                    You can learn more about the script, state or transactions of this dApp in  <a> </a>
                    <a className={styles.header_logoFont}
                     href={`https://wavesexplorer.com/address/${DAPP_ADDRESS}`}>Waves Explorer</a></div>
                       
                    </div>
                    <div className={styles.form}>
                        <Form/>
                    </div>
                </div>
            </div>
        </div>;
    }
}
