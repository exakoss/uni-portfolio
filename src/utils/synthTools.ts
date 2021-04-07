import {Network, Synth, synthetix, SynthetixJS} from '@synthetixio/js'
import {createMainnetProvider} from './ethersTools';
import {BlockOption, SynthData} from '../types';

export const createMainnetSnxjs = () => {
    const mainnetProvider = createMainnetProvider()
    return synthetix({network: Network.Mainnet, provider: mainnetProvider})
}

export const listAllSynths = (snxjs:SynthetixJS):Synth[] => {
    return snxjs.synths.map((s) => s)
}

export const getSynthQuoteByBlock = async(snxjs:SynthetixJS,synth:Synth,blockOption:BlockOption):Promise<SynthData> => {
    const {formatEther} = snxjs.utils
    const rateForSynth = formatEther(await snxjs.contracts.ExchangeRates.rateForCurrency(snxjs.toBytes32(synth.name), blockOption));
    return {
        ...synth,
        formattedRate: Number(rateForSynth)
    }
}

export const getSynthsQuotesByBlock = async (snxjs:SynthetixJS,synths:Synth[],blockOption:BlockOption):Promise<SynthData[]> => {
    return await Promise.all(synths.map(async (s) => {
        return await getSynthQuoteByBlock(snxjs, s, blockOption)
    }))
}



