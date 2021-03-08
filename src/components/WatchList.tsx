import React from 'react'
import BaseTokenList from './BaseTokenList';
import {useQuery} from '@apollo/client';
import {ETH_PRICE_QUERY, FETCH_TOKENS_BY_ID} from '../graphql/queries';
import {Dimensions, View} from 'react-native';
import theme from '../theme';
import {RootStateOrAny, useSelector} from 'react-redux';

const {height} = Dimensions.get('window')

const WatchList:React.FC = () => {
    const idList = useSelector((state:RootStateOrAny) => state.tokenIds)
    const ethPriceInUSD = useSelector((state:RootStateOrAny) => state.ethPrice.price)
    const {data: tokenData, loading: tokenLoading} = useQuery(FETCH_TOKENS_BY_ID,{variables: {tokenIds: idList.tokenIds}})
    let passedTokens = (tokenData === undefined) ? [] : tokenData.tokens
    return(
        <View style={{height: height}}>
         <BaseTokenList tokens={passedTokens} ethPriceInUSD={ethPriceInUSD}/>
        </View>
    )
}

export default WatchList
