import {gql} from '@apollo/client'

export const FETCH_TOKENS_BY_NAME = gql`
    query findTokens($contains: String!) {
        tokens(where: {symbol_contains: $contains, derivedETH_gt: 0.0000001, totalLiquidity_gt: 5}, first:50, orderBy: txCount, orderDirection: desc) {
            symbol,
            name,
            id,
            derivedETH
        }
    }
`

export const ETH_PRICE_QUERY = gql`
    query bundles {
        bundles(where: { id: "1" }) {
            ethPrice
        }
    }
`

export const FETCH_TOKENS_BY_ID = gql`
    query fetchTokensById($tokenIds: [String!]) {
        tokens(
            where: {id_in: $tokenIds},
            orderBy: totalLiquidity,
            orderDirection: desc)
        {
            symbol,
            name,
            id,
            derivedETH
        }
    }
`

export const GET_BLOCK = gql`
    query blocks($timestampFrom: Int!, $timestampTo: Int!) {
        blocks(
            first: 1
            orderBy: timestamp
            where: { timestamp_gt: $timestampFrom, timestamp_lt: $timestampTo }
        ) {
            id
            number
            timestamp
        }
    }
`

export const FETCH_DAILY_PRICES_BY_NAME = gql`
    query fetchDailyPricesByName($contains: String!,$blockNumber: Int!){
        tokens(
            where: {
                symbol_contains: $contains,
                derivedETH_gt: 0.0000001,
                totalLiquidity_gt: 5
            },
            block: {number: $blockNumber},
            orderBy: totalLiquidity,
            orderDirection: desc
        ) {
            id
            derivedETH
        }
        bundles(
            where: {id: "1"}
            block: {number: $blockNumber}
        ) {
            ethPrice
        }
    }
`

export const FETCH_DAILY_PRICES_BY_ID = gql`
    query fetchDailyPricesById($tokenIds: [String!]!,$blockNumber: Int!) {
        tokens(
            where: {id_in: $tokenIds},
            block: {number: $blockNumber},
            orderBy: txCount,
            orderDirection: desc
        ) {
            id,
            derivedETH
        }
        bundles(
            where: {id: "1"}
            block: {number: $blockNumber}
        ) {
            ethPrice
        }
    }
`
