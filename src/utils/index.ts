import {blockClient} from '../graphql/client';
import {TIMESTAMP_INTERVAL} from '../constants';
import {
    FETCH_TOKENS_BY_NAME,
    GET_BLOCK,
    FETCH_DAILY_PRICES_BY_ID,
    FETCH_TOKENS_BY_ID,
    FETCH_TOKEN_DATA_BY_ID,
    ETH_PRICE
} from '../graphql/queries';
import dayjs from 'dayjs';
import {TokenData, DailyTokenData, ExtendedTokenData} from '../types';
import {client} from '../graphql/client';

type GetBlockProp = 'ONE_DAY' | 'TWO_DAYS' | 'CURRENT_DAY'

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

//Parsing and calculating functions
export const parsePriceToFixedNumber = (stringPrice: string):number => {
    return Number(parseFloat(stringPrice).toFixed(2))
}

export const calculateETHPrice = (derivedETH:string,ethPriceInUSD:number):number => {
    return Number((parseFloat(derivedETH) * ethPriceInUSD).toFixed(4))
}

export const toMoney = (value:number):string => {
    return '$' + value.toFixed(3).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}
