import {gql} from '@apollo/client'

export const FIND_TOKENS_BY_NAME = gql`
    query findTokens($contains: String!) {
        tokens(where: {symbol_contains: $contains, derivedETH_gt: 0.0000001, totalLiquidity_gt: 5}, orderBy: totalLiquidity, orderDirection: desc) {
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
        tokens(where: {id_in: $tokenIds},orderBy: totalLiquidity, orderDirection: desc) {
            symbol,
            name,
            id,
            derivedETH
        }
    }
`
