import React from 'react';
import styles from './styles.scss';
import Form from '@src/components/Form';
import SignBtn from '@components/SignBtn';
import AccountStore from '@stores/AccountStore';
import { inject, observer } from 'mobx-react';
import Avatar from '@components/Avatar';
import { DAPP_ADDRESS } from '@stores/DappStore';
import gif from '../../assets/gif/GIF1.gif';

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
                    <div className={styles.gif}/>

                    <p>Exchanger-dApp stores Waves and Liquid assets and allows to exchange them. The price is calculated by the formula depending on the amount of assets it has. The less asset is left - the greater is calculated price.</p>   

                    {/* <p>
                        Currently account contains <b>${this.state.Liquid}</b> WAVES and <b><span /></b> LIQUID 
                    </p> */}
                    You can check transactions, asset balances and contract code in <a className={styles.header_logoFont}
                     href={`https://wavesexplorer.com/address/${DAPP_ADDRESS}`}>Waves Explorer</a>
                    
                    <h3>How to use:</h3>
                    
                    1. Sign in WavesKeeper, choose the token you pay<br /><br />
                    2. After you indicate the amount you want to <b>pay</b>, you will see information about the price and how many tokens  you should get <br /><br />
                    3. As the price can change in time, you can specify an <b>acceptable price level</b> <br /><br />
                    4. Log in and exchange!<br /><br/>

                    You are welcome to ask any questions at the <a> </a>
                      <a className={styles.header_logoFont} href={`https://forum.wavesplatform.com/t/exchanger-with-constant-liquidity-demo/16029`}>forum.</a> 
                      </div>

                    </div>
                    <div className={styles.form}>
                        <Form/>
                    </div>
                </div>
            </div>
        </div>;
    }
}
