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

    private handleChangeTokensCount = (e) => this.setState({tokensCount: +e.target.value});

    private handleExchange = () => this.props.dappStore!.exchange(this.state.tokensCount, this.state.isWavesToken);

    private handleOnWavesToken = () => this.setState({isWavesToken: true});

    private handleOffWavesToken = () => this.setState({isWavesToken: false});

    handleFocus = (e) => e.target.select();

    render(): React.ReactNode {
        const {isWavesToken, tokensCount} = this.state;
        const {isApplicationAuthorizedInWavesKeeper: isLogin} = this.props.accountStore!;
        return <div className={styles.root}>

            <div>
                <div className={styles.header1Font}>Title</div>
                <div className={styles.calculateField_col}>
                    <div className={styles.header2Font}>
                        Сумма для обмена
                    </div>
                    <div className={styles.captionFont}>Вы платите</div>
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
                    <div className={styles.header2Font}>Выберете токен:</div>

                    <div className={styles.termInfField_buttonSet}>
                        <button
                            onClick={this.handleOnWavesToken}
                            className={isWavesToken ? styles.leftCheckbox_selected : styles.leftCheckbox}
                        >
                            WAVES
                        </button>

                        <button
                            onClick={this.handleOffWavesToken}
                            className={isWavesToken ? styles.rightCheckbox : styles.rightCheckbox_selected}
                        >
                            Liquid
                        </button>
                    </div>
                </div>

            </div>
            <div>
                <div className={styles.header2Font}>Текущий курс Liquid/Waves: {this.props.dappStore!.actualPrice}</div>

                <div className={styles.yellowCaption}>Для операции обмена вам необходимо подписать транзакцию</div>
                <div className={styles.btnField}>
                    <SignBtn>
                        <button
                            disabled={isLogin}
                            className={styles.submitBnt}>
                            Авторизироваться
                        </button>
                    </SignBtn>
                    <button
                        disabled={!isLogin}
                        className={styles.submitBnt}
                        onClick={this.handleExchange}
                    >
                        Обменять
                    </button>
                </div>
            </div>
        </div>;
    }
}
