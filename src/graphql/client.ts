import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    })
})

export const blockClient = new ApolloClient({
    link: new HttpLink({
        uri: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks'
    }),
    cache: new InMemoryCache()
})
