import {Network, Synth, synthetix, SynthetixJS} from '@synthetixio/js'
import {createMainnetProvider} from './ethersTools';
import {BlockOption, SynthData} from '../types';
import {getBlock} from './index';

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

export const getSNXPrice = async(snxjs:SynthetixJS,blockOption:BlockOption):Promise<number> => {
    const {formatEther} = snxjs.utils

    return Number(formatEther( await snxjs.contracts.ExchangeRates.rateForCurrency(
        snxjs.toBytes32('SNX'),
        blockOption
    )))
}

export const getCurrentSNXPrice = async ():Promise<number> => {
    const snxjs = createMainnetSnxjs()
    const newCurrentBlock = await getBlock('CURRENT_DAY').then(result => result)
    return await getSNXPrice(snxjs,{blockTag: newCurrentBlock}).then(result => result)
}


