import {Network, Synth, synthetix, SynthetixJS} from '@synthetixio/js'
import {createMainnetProvider} from './ethersTools';
import {BlockOption, SynthData, TokenListEntry, WatchlistEntry,} from '../types';
import {GetBlockProp, getDailyQuotesByID, getTokensByID, transformUNIQuotesToTokenListEntry} from './index';
import {store} from '../store';
import {synthRateClient} from '../graphql/client';
import {GET_LATEST_RATE, GET_RATE_BY_BLOCK} from '../graphql/synthQueries';
import {ethers} from 'ethers'
//@ts-ignore
import snxData from 'synthetix-data'

export const createMainnetSnxjs = () => {
    const mainnetProvider = createMainnetProvider()
    return synthetix({network: Network.Mainnet, provider: mainnetProvider})
}

export const createConnectedSnxjs = () => {
    const wallet = store.getState().wallet.wallet
    if (wallet) return synthetix({signer: wallet})
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

export const getLatestSynthRate = async (synthName:string) => {
    let result = await synthRateClient.query({
        query:GET_LATEST_RATE,
        variables: {
            synthName: synthName
        }
    })
    return Number(ethers.utils.formatEther(result.data.latestRate.rate))
}

export const getLatestSynthData = async(synth:Synth):Promise<SynthData> => {
    const newSynthRate = await getLatestSynthRate(synth.name)
    return {
        ...synth,
        formattedRate: newSynthRate
    }
}

export const getLatestSynthsDatas = async(synths:Synth[]):Promise<SynthData[]> => {
    return await Promise.all(synths.map(async (s) => {
        return await getLatestSynthData(s)
    }))
}

export const getSynthRateByBlock = async(synthName:string,blockNumber:number) => {
    let result = await synthRateClient.query({
        query:GET_RATE_BY_BLOCK,
        variables: {
            synthName:synthName,
            blockNumber:blockNumber
        }
    })
    if (result.data.rateUpdates[0]) return Number(ethers.utils.formatEther(result.data.rateUpdates[0].rate))
    else return 0
}

// export const getSynthQuoteByBlock = async(snxjs:SynthetixJS,synth:Synth,blockOption:BlockOption):Promise<SynthData> => {
//     const {formatEther} = snxjs.utils
//     const rateForSynth = formatEther(await snxjs.contracts.ExchangeRates.rateForCurrency(snxjs.toBytes32(synth.name), blockOption));
//     return {
//         ...synth,
//         formattedRate: Number(rateForSynth)
//     }
// }
//
// export const getSynthsQuotesByBlock = async (snxjs:SynthetixJS,synths:Synth[],blockOption:BlockOption):Promise<SynthData[]> => {
//     return await Promise.all(synths.map(async (s) => {
//         return await getSynthQuoteByBlock(snxjs, s, blockOption)
//     }))
// }

export const getTokenListEntryFromWatchlistEntry = async (snxjs:SynthetixJS,watchlistEntry:WatchlistEntry,dailyBlock:number,currentETHPrice:number):Promise<TokenListEntry> => {
    switch (watchlistEntry.dataSource) {
        case 'SYNTH':
            const currentSynth = findSynthByName(snxjs,watchlistEntry.id)
            if (currentSynth) {
                const currentSyntRate = await getLatestSynthRate(currentSynth.name)
                const dailySynthRate = await getSynthRateByBlock(currentSynth.name,dailyBlock)
                return {
                    ...currentSynth,
                    formattedRate: currentSyntRate,
                    formattedRateDaily: dailySynthRate,
                    dataSource: watchlistEntry.dataSource
                }
            }
        case 'UNI':
            const newTokenData = await getTokensByID([watchlistEntry.id])
            const newDailyTokenData = await getDailyQuotesByID([watchlistEntry.id],dailyBlock)
            return transformUNIQuotesToTokenListEntry(newTokenData,newDailyTokenData,currentETHPrice)[0]
    }
}

export const getTokenListEntriesFromWatchlistEntries = async (watchlistEntries:WatchlistEntry[]):Promise<TokenListEntry[]> => {
    const snxjs = createMainnetSnxjs()
    if (!snxjs) throw ('No signer has been connected')
    const newDailyBlock = store.getState().dailyBlock.blockNumber
    const newCurrentETHPrice = store.getState().ethPrice.price
    return await Promise.all(watchlistEntries.map(async (e) => {
        return await getTokenListEntryFromWatchlistEntry(snxjs,e,newDailyBlock,newCurrentETHPrice)
    }))
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
