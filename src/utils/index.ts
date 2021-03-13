import {blockClient} from '../graphql/client';
import {TIMESTAMP_INTERVAL} from '../constants';
import {
    FETCH_TOKENS_BY_NAME,
    GET_BLOCK,
    FETCH_DAILY_PRICES_BY_ID,
    FETCH_TOKENS_BY_ID
} from '../graphql/queries';
import dayjs from 'dayjs';
import {TokenData, DailyTokenData} from '../types';
import {client} from '../graphql/client';

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

//Get a 24hr ago unix timestamp
export const getDailyTimestamp = ():number => {
    const utcCurrentTime = dayjs()
    const day = utcCurrentTime
        .subtract(1,'day')
        .startOf('minute')
        .unix()
    return day
}

export const getDailyBlock = async (): Promise<number> => {
    const lastTimestamp = getDailyTimestamp()
    return await getBlockFromTimestamp(lastTimestamp)
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

export const parsePriceToFixedNumber = (stringPrice: string):number => {
    return Number(parseFloat(stringPrice).toFixed(2))
}

export const calculateETHPrice = (derivedETH:string,ethPriceInUSD:number):number => {
    return Number((parseFloat(derivedETH) * ethPriceInUSD).toFixed(4))
}
