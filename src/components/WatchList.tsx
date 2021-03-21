import React, {useEffect, useState} from 'react'
import BaseTokenList from './BaseTokenList';
import {Dimensions, View, Text} from 'react-native';
import theme from '../theme';
import {RootStateOrAny, useSelector} from 'react-redux';
import {UnitedTokenData} from '../types';
import {getBlock, getDailyQuotesByID, getTokensByID} from '../utils';

const {height} = Dimensions.get('window')

const WatchList:React.FC = () => {
    const idList = useSelector((state:RootStateOrAny) => state.tokenIds)
    const listPlaceholder = 'You do not have any tokens in your watchlist. Switch to the Search tab and add a token from there.'
    const ethPriceInUSD = useSelector((state:RootStateOrAny) => state.ethPrice.price)
    const dailyBlockNumber = useSelector((state:RootStateOrAny) => state.dailyBlock.blockNumber)
    const [unitedTokenData, setUnitedTokenData]= useState<UnitedTokenData>({tokenData:{tokens:[]},dailyTokenData:{tokens:[],bundles:[]}})

    useEffect(() => {
        const fetchTokens = async () => {
            const newTokenData = await getTokensByID(idList.tokenIds).then(result => result)
            const newDailyTokenData = await getDailyQuotesByID(idList.tokenIds, dailyBlockNumber).then(result => result)
            setUnitedTokenData({tokenData: newTokenData, dailyTokenData: newDailyTokenData})
        }
        fetchTokens()
    },[idList])

    return(
        <View style={{flex: 1,height: height}}>
            <Text style={{color: theme.colors.textWhite, textAlign: "center", fontSize: theme.fontsize.normal}}> Current ETH price: ${ethPriceInUSD}</Text>
            <BaseTokenList tokensNow={unitedTokenData.tokenData} ethPriceInUSD={ethPriceInUSD} tokensDaily={unitedTokenData.dailyTokenData} placeholder={listPlaceholder}/>
        </View>
    )
}

export default WatchList
