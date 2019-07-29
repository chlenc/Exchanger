import { SubStore } from './SubStore';
import { action, autorun, observable } from 'mobx';
import { RootStore } from '@stores';

const NODE_URL = 'https://nodes.wavesnodes.com';
export const DAPP_ADDRESS = '3P86qVPJkConqz9qStXYMPTgQmzi5GAJ5ed';
const DAPP_ASSET = '7FzrHF1pueRFrPEupz6oiVGTUZqe8epvC7ggWUx8n1bd';

const m = 1e8;

class DappStore extends SubStore {
    @observable actualPrice: number = 0;
    @observable wavesAmount: number = 0;
    @observable liquidAmount: number = 0;

    constructor(rootStore: RootStore) {
        super(rootStore);
    }


    @action
    updatePrice = async () => {
        const wavesAmount =
            await (await fetch(`${NODE_URL}/addresses/data/${DAPP_ADDRESS}/wavesAmount`)).json();
        const liquidAmount =
            await (await fetch(`${NODE_URL}/addresses/data/${DAPP_ADDRESS}/liquidAmount`)).json();
        if (!wavesAmount.error && !liquidAmount.error) {
            this.wavesAmount = wavesAmount.value / m;
            this.liquidAmount = liquidAmount.value / m;
            this.actualPrice = liquidAmount.value / wavesAmount.value;
            console.log('wavesAmount ', this.wavesAmount);
            console.log('liquidAmount ', this.liquidAmount);
            console.log('actualPrice ', this.actualPrice);
        }
    };

    startListeningDappData = () => autorun(
        (reaction) => this.updatePrice(),
        {scheduler: run => setInterval(run, 5000)}
    );


    @action
    exchange = (u: number, isWaves: boolean, minAmount?: number) => {
        if (u <= 0) {
            alert('Your amount cannot be less than or equal to zero.');
            return;
        }
        window['WavesKeeper'].signAndPublishTransaction(
            {
                type: 16,
                data: {
                    dApp: DAPP_ADDRESS,
                    fee: {'tokens': '0.05', 'assetId': 'WAVES'},
                    call: {
                        function: 'exchanger',
                        args: [{type: 'integer', value: Math.floor((minAmount || 0)).toString()}]
                    },
                    payment: [{assetId: isWaves ? null : DAPP_ASSET, tokens: u}]
                }
            }
        ).then((tx) => {
            console.log(tx);
            try {
                alert(`Paid off: ${JSON.parse(tx)['trace'][0]['result']['transfers'][0]['amount'] / m} ${isWaves
                    ? 'LIQUID' : 'WAVES'}`);
                this.updatePrice();
            } catch (e) {
                alert('done');
            }
        }).catch((error) => {
            alert(error.message);
            console.error(error);
        });
    };
}

export default DappStore;
