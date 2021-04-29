import {gql} from '@apollo/client'

export const GET_LATEST_RATE = gql`
    query latestRate($synthName: String!) {
        latestRate(id:$synthName) {
            id,
            rate
        }
    }
`
