import { SubStore } from './SubStore';
import { action, observable } from 'mobx';
import { RootStore } from '@stores';

const DAPP_ADDRESS = '3N4w7wVkViML11XdFL5xNkPofVVg1nLWEmX';
const DAPP_ASSET = 'GhAFhXzwCYfvcXQ3GHFaQFnCzAuYCT156qFqiYyzfkzv';

class DappStore extends SubStore {
    @observable height: number = 0;

    constructor(rootStore: RootStore) {
        super(rootStore);
    }

    @action
    exchange = (u: number, isWaves: boolean) => {
        if (u <= 0) {
            alert('Your amount cannot be less than or equal to zero.');
            return;
        }
        window['WavesKeeper'].signAndPublishTransaction({
            type: 16,
            data: {
                dApp: DAPP_ADDRESS,
                fee: {'tokens': '0.05', 'assetId': 'WAVES'},
                call: {function: 'uniswap', args: []},
                payment: [{assetId: isWaves ? null : DAPP_ASSET, tokens: u}]
            }
        }).then((tx) => {
            console.log(tx);
        }).catch((error) => {
            alert(error.message);
        });
    };
}

export default DappStore;
