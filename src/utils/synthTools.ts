import {Network, Synth, synthetix, SynthetixJS} from '@synthetixio/js'
import {createMainnetProvider} from './ethersTools';
import {BlockOption, SynthData} from '../types';
import {getBlock} from './index';
import {GetBlockProp} from './index';
//@ts-ignore
import snxData from 'synthetix-data'

export const createMainnetSnxjs = () => {
    const mainnetProvider = createMainnetProvider()
    return synthetix({network: Network.Mainnet, provider: mainnetProvider})
}

export const listAllSynths = (snxjs:SynthetixJS):Synth[] => {
    return snxjs.synths.map((s) => s)
}

export const findSynthByName = (snxjs:SynthetixJS, synthName:string):Synth | undefined => {
    const synth = snxjs.synths.find((s) => s.name === synthName)
    if (synth) {
        return synth
    } else {
        return undefined
    }
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

export const getTimestampInSeconds = (period: GetBlockProp):number => {
    switch (period) {
        case 'CURRENT_DAY':
            return Math.round(new Date().getTime()/1000)
        case 'ONE_DAY':
            return Math.round(new Date().getTime()/1000) - 86400
        case 'TWO_DAYS':
            return Math.round(new Date().getTime()/1000) - 172800
        default:
            return 0
    }
}

export const fetchExchanges = (period:GetBlockProp) => {
    return snxData.exchanges.since({
        minTimestamp: getTimestampInSeconds(period)
    })
}

export const calculateTotalVolumeForSynth = (baseCurrencyKey:string, quoteCurrencyKey:string, exchanges:any):number => {
    return exchanges
        .filter(
            (exchange:any) =>
                (exchange.fromCurrencyKey === quoteCurrencyKey &&
                    exchange.toCurrencyKey === baseCurrencyKey) ||
                (exchange.fromCurrencyKey === baseCurrencyKey &&
                    exchange.toCurrencyKey === quoteCurrencyKey)
        )
        .reduce((totalVolume:number, exchange:any) => {
            totalVolume += exchange.fromAmountInUSD;
            return totalVolume;
        }, 0)
}

export const getSynthVolumeInUSD = async (baseCurrencyKey:string, quoteCurrencyKey:string, period:GetBlockProp):Promise<number> => {
    try {
        const exchanges = await fetchExchanges(period);
        return calculateTotalVolumeForSynth(baseCurrencyKey, quoteCurrencyKey, exchanges);
    } catch (e) {
        return 0
    }
};

export const fetchSynthSupply = async (snxjs:SynthetixJS, synth: Synth, blockOption:BlockOption) => {
    const {formatEther} = snxjs.utils
    return Number(formatEther(await snxjs.contracts[`Synth${synth.name}`].totalSupply(blockOption)))
}

export const getSynthSupplyInUSD = (synthSupply:number, synthRate:number) => {
    return synthSupply * synthRate
}
