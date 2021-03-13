import React, {useEffect, useState} from 'react'
import BaseTokenList from './BaseTokenList';
import {useQuery} from '@apollo/client';
import {FETCH_TOKENS_BY_ID} from '../graphql/queries';
import {Dimensions, View, Text} from 'react-native';
import theme from '../theme';
import {RootStateOrAny, useSelector} from 'react-redux';
import {UnitedTokenData} from '../types';
import {getDailyBlock, getDailyQuotesByID, getTokensByID} from '../utils';

const {height} = Dimensions.get('window')

const WatchList:React.FC = () => {
    const idList = useSelector((state:RootStateOrAny) => state.tokenIds)
    console.log(idList.tokenIds)
    const ethPriceInUSD = useSelector((state:RootStateOrAny) => state.ethPrice.price)
    const [unitedTokenData, setUnitedTokenData]= useState<UnitedTokenData>({tokenData:{tokens:[]},dailyTokenData:{tokens:[],bundles:[]}})
    useEffect(() => {
        const fetchTokens = async () => {
            const newTokenData = await getTokensByID(idList.tokenIds).then(result => result)
            const dailyBlock = await getDailyBlock().then(result => result)
            const newDailyTokenData = await getDailyQuotesByID(idList.tokenIds, dailyBlock).then(result => result)
            setUnitedTokenData({tokenData: newTokenData, dailyTokenData: newDailyTokenData})
        }
        fetchTokens()
    },[idList])

    // const {data: tokenData, loading: tokenLoading} = useQuery(FETCH_TOKENS_BY_ID,{variables: {tokenIds: idList.tokenIds}})

    return(
        <View style={{flex: 1,height: height}}>
            <Text style={{color: theme.colors.textWhite, textAlign: "center"}}>Current ETH price: ${ethPriceInUSD}</Text>
            <BaseTokenList tokensNow={unitedTokenData.tokenData} ethPriceInUSD={ethPriceInUSD} tokensDaily={unitedTokenData.dailyTokenData}/>
        </View>
    )
}

export default WatchList
