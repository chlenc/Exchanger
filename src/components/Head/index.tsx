import React from 'react';
import styles from './styles.scss';
import Form from '@src/components/Form';
import SignBtn from '@components/SignBtn';
import AccountStore from '@stores/AccountStore';
import { inject, observer } from 'mobx-react';
import Avatar from '@components/Avatar';


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
                    <div className={styles.header_logoFont}>Lorem ipsum dolor</div>
                    {
                        wavesKeeperAccount
                            ? <div className={styles.header_sign}>
                                <Avatar className={styles.header_avatar} address={wavesKeeperAccount.address}/>
                                {wavesKeeperAccount.address}
                            </div>
                            : <SignBtn className={styles.header_sign}>
                                <div className={styles.header_signIcon}/>
                                Sign in with Keeper
                            </SignBtn>
                    }
                </div>
                <div className={styles.body}>
                    <div className={styles.info}>
                        <div className={styles.headerFont}>Lorem ipsum dolor</div>
                        <div className={styles.captionFont}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                    <div className={styles.form}>
                        <Form/>
                    </div>
                </div>
            </div>
            <div className={styles.footer}/>
        </div>;
    }
}
