import { SubStore } from './SubStore';
import { action, observable } from 'mobx';
import { RootStore } from '@stores';

const NODE_URL = 'https://testnodes.wavesnodes.com';
const DAPP_ADDRESS = '3N4w7wVkViML11XdFL5xNkPofVVg1nLWEmX';
const DAPP_ASSET = 'GhAFhXzwCYfvcXQ3GHFaQFnCzAuYCT156qFqiYyzfkzv';

const m = 1e8;

class DappStore extends SubStore {
    @observable height: number = 0;
    @observable actualPrice: number = 0;

    constructor(rootStore: RootStore) {
        super(rootStore);
    }


    @action
    updatePrice = async () => {
        const wavesAmount =
            await (await fetch(`${NODE_URL}/addresses/data/3N4w7wVkViML11XdFL5xNkPofVVg1nLWEmX/wavesAmount`)).json();
        const liquidAmount =
            await (await fetch(`${NODE_URL}/addresses/data/3N4w7wVkViML11XdFL5xNkPofVVg1nLWEmX/liquidAmount`)).json();
        if (!wavesAmount.error && !liquidAmount.error) this.actualPrice = liquidAmount.value / wavesAmount.value;
    };

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
            alert(`Paid off: ${JSON.parse(tx)['trace'][0]['result']['transfers'][0]['amount'] / m} ${isWaves
                ? 'uniswap' : 'WAVES'}`);
        }).catch((error) => {
            alert(error.message);
        });
    };
}

export default DappStore;
