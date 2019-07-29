import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';


import styles from './styles.scss';
import Face from '@components/Head';
import AccountStore from '@stores/AccountStore';
import DappStore from '@stores/DappStore';

interface IProps {
    accountStore?: AccountStore
    dappStore?: DappStore
}

@inject('accountStore', 'dappStore')
@observer
class App extends Component<IProps> {

    componentDidMount(): void {
        console.log('this app worked in testNet node');
        this.props.dappStore!.startListeningDappData();
        this.props.accountStore!.setupWavesKeeper();
    }

    render() {
        return (
            <div className={styles.root}>
                <Face/>
            </div>
        );
    }
}

export default App;
