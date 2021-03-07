import React from 'react'
import BaseTokenList from './BaseTokenList';
import {useQuery} from '@apollo/client';
import {ETH_PRICE_QUERY, FETCH_TOKENS_BY_ID} from '../graphql/queries';
import {Dimensions} from 'react-native';
import theme from '../theme';
import {RootStateOrAny, useSelector} from 'react-redux';

const {height} = Dimensions.get('window')

const WatchList:React.FC = () => {
    const idList = useSelector((state:RootStateOrAny) => state.tokenIds)
    const {loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
    const {data: tokenData, loading: tokenLoading} = useQuery(FETCH_TOKENS_BY_ID,{variables: {tokenIds: idList.tokenIds}})

    const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice
    let passedTokens = (tokenData === undefined) ? [] : tokenData.tokens
    return(
        <BaseTokenList tokens={passedTokens} ethPriceInUSD={ethPriceInUSD}/>
    )
}

export default WatchList
