import React from 'react';
import styles from './styles.scss';
import SignBtn from '@components/SignBtn';
import { inject, observer } from 'mobx-react';
import { AccountStore, DappStore } from '@stores';

interface IState {
    isWavesToken: boolean,
    tokensCount: number
}

interface IProps {
    accountStore?: AccountStore
    dappStore?: DappStore
}

@inject('accountStore', 'dappStore')
@observer
export default class FreedForm extends React.Component<IProps, IState> {

    state: IState = {
        isWavesToken: true,
        tokensCount: 0
    };

    private handleChangeTokensCount = (e) => this.setState({tokensCount: +e.target.value})

    private handleExchange = () => this.props.dappStore!.exchange(this.state.tokensCount, this.state.isWavesToken);

    private handleOnWavesToken = () => this.setState({isWavesToken: true});

    private handleOffWavesToken = () => this.setState({isWavesToken: false});

    handleFocus = (e) => e.target.select();

    render(): React.ReactNode {
        const {isWavesToken, tokensCount} = this.state;
        const {isApplicationAuthorizedInWavesKeeper: isLogin} = this.props.accountStore!;
        return <div className={styles.root}>

            <div>
                <div className={styles.header1Font}>Loan calculator</div>
                <div className={styles.calculateField_col}>
                    <div className={styles.header2Font}>
                        Amount for exchange
                    </div>
                    <div className={styles.captionFont}>You pay</div>
                    <div className={styles.inputField}>
                        {isWavesToken ? <div className={styles.wavesIcn}/> : <div className={styles.btcIcn}/>}
                        <input
                            type="number"
                            onChange={this.handleChangeTokensCount}
                            onFocus={this.handleFocus}
                            value={tokensCount}
                        />
                    </div>
                </div>
                <div className={styles.termInfField}>
                    <div className={styles.header2Font}>Choose token:</div>
                    <div className={styles.termInfField_buttonSet}>
                        <button
                            onClick={this.handleOnWavesToken}
                            className={isWavesToken ? styles.leftCheckbox_selected : styles.leftCheckbox}
                        >
                            WAVES TOKEN
                        </button>
                        <button
                            onClick={this.handleOffWavesToken}
                            className={isWavesToken ? styles.rightCheckbox : styles.rightCheckbox_selected}
                        >
                            UNISWAP TOKEN
                        </button>
                    </div>
                </div>

            </div>
            <div>

                <div className={styles.yellowCaption}>To take a loan you have to sign in first</div>
                <div className={styles.btnField}>
                    <SignBtn>
                        <button
                            disabled={isLogin}
                            className={styles.submitBnt}>
                            Sign in with Keeper
                        </button>
                    </SignBtn>
                    <button
                        disabled={!isLogin}
                        className={styles.submitBnt}
                        onClick={this.handleExchange}
                    >
                        Exchange
                    </button>
                </div>
            </div>
        </div>;
    }
}
