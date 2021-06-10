import {gql} from '@apollo/client'

export const GET_LATEST_RATE = gql`
    query latestRate($synthName: String!) {
        latestRate(id:$synthName) {
            id,
            rate
        }
    }
`

export const GET_RATE_BY_BLOCK = gql`
    query rateByBlock($synthName: String!,$blockNumber: Int!) {
        rateUpdates(where:{synth:$synthName},block:{number:$blockNumber},orderBy:block,orderDirection:desc,first:1){
            block,
            rate,
            id
        }
    }
`
