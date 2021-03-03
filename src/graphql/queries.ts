import {gql} from '@apollo/client'

export interface BasicToken {
    name: string,
    symbol: string,
    id: string,
    derivedETH?: number
}


export const FIND_TOKENS_BY_NAME = gql`
    query FindTokens($contains: String!) {
        tokens(where: {name_contains: $contains, derivedETH_not: 0}) {
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
