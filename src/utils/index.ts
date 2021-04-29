import {blockClient, client} from '../graphql/client';
import {TIMESTAMP_INTERVAL} from '../constants';
import {
    ETH_PRICE,
    FETCH_DAILY_PRICES_BY_ID,
    FETCH_TOKEN_DATA_BY_ID,
    FETCH_TOKENS_BY_ID,
    FETCH_TOKENS_BY_NAME,
    GET_BLOCK,
    GET_BLOCKS, GET_UNI_PRICES_BY_BLOCK
} from '../graphql/queries';
import dayjs from 'dayjs';
import {Block, DailyTokenData, ExtendedTokenData, TokenData, TokenListEntry, WatchlistEntry, PriceChartEntry} from '../types';
import {store} from '../store';
import {StyleSheet} from 'react-native';


export type GetBlockProp = 'ONE_DAY' | 'TWO_DAYS' | 'CURRENT_DAY'

//Get a single block from a timestamp
export const getBlockFromTimestamp = async (timestamp: number) => {
    let result = await blockClient.query({
        query: GET_BLOCK,
        variables: {
            timestampFrom: timestamp,
            timestampTo: timestamp + TIMESTAMP_INTERVAL
        },
        fetchPolicy: 'cache-first'
    })
    return Number(result?.data?.blocks?.[0]?.number)
}

export const getBlocksFromTimestamps = async (startTimestamp:number,endTimestamp:number):Promise<Block[]> => {
    let result = await blockClient.query({
        query: GET_BLOCKS,
        variables: {
            timestampFrom: startTimestamp,
            timestampTo: endTimestamp
        },
        fetchPolicy: 'cache-first'
    })
    return (result.data.blocks)
}

//Get a unix timestamp
export const getTimestamp = (period:GetBlockProp):number => {
    const utcCurrentTime = dayjs()
    let day: number = 0;
    if (period === 'ONE_DAY') {
         day = utcCurrentTime
            .subtract(1,'day')
            .startOf('minute')
            .unix()
    } else if (period === 'TWO_DAYS') {
        day = utcCurrentTime
            .subtract(2,'day')
            .startOf('minute')
            .unix()
    } else if (period === 'CURRENT_DAY') {
        day = utcCurrentTime
            .subtract(30,'seconds')
            .startOf('minute')
            .unix()
    }
    return day
}

export const getTimestampsBackward = (hours:number):{currentUnix:number,backwardUnix:number} => {
    const utcCurrentTime = dayjs()
    const currentUnix = utcCurrentTime.startOf('minute').unix()
    const backwardUnix = utcCurrentTime.subtract(hours,'hours').startOf('minute').unix()
    return {currentUnix,backwardUnix}
}

//Generates a certain amount of dates with an hourly interval
export const generateDates = (amount:number):{unixTimestamps:number[],plotlyTimestamps:string[]} => {
    const utcCurrentTime = dayjs()
    const blankDates = Array(amount+1).fill(0).map((v,index) => utcCurrentTime.subtract(amount - index,'hours').startOf('minute'))
    const unixTimestamps:number[] = blankDates.map((v) => v.unix())
    const plotlyTimestamps:string[] = blankDates.map((v) => v.format('YYYY-MM-DD HH:mm:ss'))
    return {unixTimestamps,plotlyTimestamps}
}

//Get a block corresponding to the period
export const getBlock = async (period:GetBlockProp): Promise<number> => {
    const lastTimestamp = getTimestamp(period)
    return await getBlockFromTimestamp(lastTimestamp)
}

//Get ETH price depending on a block
export const getETHPrice = async (blockNumber?:number): Promise<number> => {
    let result = await client.query({
        query: ETH_PRICE(blockNumber)
    })
    return parsePriceToFixedNumber(result.data.bundles[0].ethPrice)
}

export const getTokensByName = async (contains:string): Promise<TokenData> => {
    let result = await client.query({
        query: FETCH_TOKENS_BY_NAME,
        variables: {
            contains: contains
        },
        fetchPolicy: 'network-only'
    })
    return result.data
}

export const getTokensByID = async (tokenIds:string[]): Promise<TokenData> => {
    let result = await client.query({
        query: FETCH_TOKENS_BY_ID,
        variables: {
            tokenIds: tokenIds
        },
        fetchPolicy: 'network-only'
    })
    return result.data
}

export const getDailyQuotesByID = async (tokenIds:string[],blockNumber:number): Promise<DailyTokenData> => {
    let result = await client.query({
        query:  FETCH_DAILY_PRICES_BY_ID,
        variables: {
            tokenIds: tokenIds,
            blockNumber: blockNumber
        },
        fetchPolicy: 'network-only'
    })
    return result.data
}

export const getTokenDataById = async (tokenId:string, blockNumber?:number): Promise<ExtendedTokenData> => {
    let result = await client.query({
        query: FETCH_TOKEN_DATA_BY_ID(tokenId,blockNumber),
        fetchPolicy: 'network-only'
    })
    return result.data
}

export const getTokenPrices = async (tokenId:string,blocks:Block[]) => {
    let result = await client.query({
        query: GET_UNI_PRICES_BY_BLOCK(tokenId,blocks),
        fetchPolicy:'cache-first'
    })
    const keys = Object.keys(result.data)
    console.log(keys.length)
    //@ts-ignore
    const formattedPrices:PriceChartEntry[] = keys.map((k) => {
        if (k[0] === 'b') {
            const tokenIndex = `t${k.slice(1)}`
            const derivedETH = result.data[tokenIndex].derivedETH as string
            const parsedETHPrice = parsePriceToFixedNumber(result.data[k].ethPrice)
            return {timestamp:Number(k.slice(1)),formattedRate:calculateETHPrice(derivedETH,parsedETHPrice)}
        } else return
    })
    return formattedPrices
}

export const transformUNIQuotesToTokenListEntry = (tokensNow:TokenData,tokensDaily:DailyTokenData,currentETHPrice:number):TokenListEntry[] => {
    const dailyETHPriceInUSD:number = parsePriceToFixedNumber(tokensDaily.bundles[0].ethPrice)
    return tokensNow.tokens.map(t1 => {
        const t2 = tokensDaily.tokens.find(t => t.id === t1.id)
        return {
            dataSource: 'UNI',
            formattedRate: calculateETHPrice(t1.derivedETH, currentETHPrice),
            name: t1.symbol,
            asset: t1.symbol,
            description: t1.name,
            category: 'crypto',
            sign: '',
            address: t1.id,
            // @ts-ignore
            formattedRateDaily: calculateETHPrice(t2.derivedETH,dailyETHPriceInUSD),
        }
    })
}

export const isTokenListEntryIncluded = (entry:TokenListEntry, watchlistEntries:WatchlistEntry[]):boolean => {
    // const watchlistEntries = store.getState().watchlist.watchlistEntries
    switch (entry.dataSource) {
        case 'SYNTH':
            return watchlistEntries.some((e) => e.id === entry.name)
        case 'UNI':
            return watchlistEntries.some((e) => e.id === entry.address)
        default:
            return false
    }
}

export const transformTokenListEntryToWatchlistEntry = (tokenListEntry:TokenListEntry):WatchlistEntry => {
    switch (tokenListEntry.dataSource) {
        case 'UNI':
            return {
                dataSource: 'UNI',
                id: tokenListEntry.address as string
            }
        case 'SYNTH':
            return {
                dataSource: 'SYNTH',
                id: tokenListEntry.name
            }
    }
}

//Parsing and calculating functions
export const parsePriceToFixedNumber = (stringPrice: string):number => {
    return Number(parseFloat(stringPrice).toFixed(2))
}

export const calculateETHPrice = (derivedETH:string,ethPriceInUSD:number):number => {
    return Number((parseFloat(derivedETH) * ethPriceInUSD).toFixed(4))
}

export const toMoney = (value:number,position:number):string => {
    return '$' + value.toFixed(position).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}
