import React, {useEffect, useState} from 'react'
import {View, Text} from 'react-native';
import {ExtendedToken} from '../types';
import {getETHPrice, getTokenDataById, getBlock, calculateETHPrice, parsePriceToFixedNumber} from '../utils';
import {RootStateOrAny, useSelector} from 'react-redux';
import { useRoute } from '@react-navigation/native';

const SingleTokenView:React.FC = () => {
    //Extracting tokenId from the route params
    const route = useRoute();
    const { tokenId, tokenSymbol, tokenName } = route.params
    const initialState:ExtendedToken = {
        id:tokenId || '',
        name:tokenName || '',
        symbol:tokenSymbol || '',
        currentPrice: 0,
        oneDayPrice: 0,
        currentLiquidity: 0,
        oneDayLiquidity: 0,
        twoDaysLiquidity: 0,
        currentUntrackedVolume: 0,
        oneDayUntrackedVolume: 0,
        twoDaysUntrackedVolume: 0,
        currentTxs: 0,
        oneDayTxs: 0,
        twoDaysTxs: 0
    }

    const [extendedToken, setExtendedToken] = useState<ExtendedToken>(initialState)
    const currentETHPrice = useSelector((state:RootStateOrAny) => state.ethPrice.price)

    useEffect(() => {
        const updateTokenData = async () => {
            //Fetching all the necessary data about the token
            const oneDayBlock = await getBlock('ONE_DAY').then(result => result)
            const twoDaysBlock = await getBlock('TWO_DAYS').then(result => result)
            const oneDayETHPrice = await getETHPrice(oneDayBlock).then(result => result)
            const twoDaysETHPrice = await getETHPrice(twoDaysBlock).then(result => result)
            const currentTokenData = await getTokenDataById(tokenId).then(result => result)
            console.log(`Current token data:`)
            console.log(currentTokenData)
            const oneDayTokenData = await getTokenDataById(tokenId,oneDayBlock).then(result => result)
            console.log(`One day token data:`)
            console.log(oneDayTokenData)
            const twoDaysTokenData = await getTokenDataById(tokenId,twoDaysBlock).then(result => result)
            //Setting up variables for extendedToken and updating it
            const currentPrice = calculateETHPrice(currentTokenData.tokens[0].derivedETH,currentETHPrice)
            const oneDayPrice = calculateETHPrice(oneDayTokenData.tokens[0].derivedETH,oneDayETHPrice)
            const twoDaysPrice = calculateETHPrice(twoDaysTokenData.tokens[0].derivedETH,twoDaysETHPrice)
            const currentLiquidity = parsePriceToFixedNumber(currentTokenData.tokens[0].totalLiquidity) * currentPrice
            const oneDayLiquidity = parsePriceToFixedNumber(oneDayTokenData.tokens[0].totalLiquidity) * oneDayPrice
            const twoDaysLiquidity = parsePriceToFixedNumber(twoDaysTokenData.tokens[0].totalLiquidity) * twoDaysPrice
            const currentVolume = parsePriceToFixedNumber(currentTokenData.tokens[0].untrackedVolumeUSD)
            const oneDayVolume = parsePriceToFixedNumber(oneDayTokenData.tokens[0].untrackedVolumeUSD)
            const twoDaysVolume = parsePriceToFixedNumber(twoDaysTokenData.tokens[0].untrackedVolumeUSD)
            const currentTxs = parsePriceToFixedNumber(currentTokenData.tokens[0].txCount)
            const oneDayTxs = parsePriceToFixedNumber(oneDayTokenData.tokens[0].txCount)
            const twoDaysTxs = parsePriceToFixedNumber(twoDaysTokenData.tokens[0].txCount)
            setExtendedToken({
                id: tokenId,
                name: tokenName,
                symbol: tokenSymbol,
                currentPrice: currentPrice,
                oneDayPrice: oneDayPrice,
                currentLiquidity: currentLiquidity,
                oneDayLiquidity: oneDayLiquidity,
                twoDaysLiquidity: twoDaysLiquidity,
                currentUntrackedVolume: currentVolume,
                oneDayUntrackedVolume: oneDayVolume,
                twoDaysUntrackedVolume: twoDaysVolume,
                currentTxs: currentTxs,
                oneDayTxs: oneDayTxs,
                twoDaysTxs: twoDaysTxs
            })
        }
        updateTokenData()
    },[])

    return (
        <View>
            <Text>Single Token View</Text>
            <Text>Current price: ${extendedToken.currentPrice}</Text>
            <Text>Previous day price: ${extendedToken.oneDayPrice}</Text>
            <Text>Current liquidity: ${extendedToken.currentLiquidity}</Text>
            <Text>Current volume: ${extendedToken.currentUntrackedVolume - extendedToken.oneDayUntrackedVolume}</Text>
            <Text>Transactions 24hrs: {extendedToken.currentTxs - extendedToken.oneDayTxs}</Text>
        </View>
    )
}

export default SingleTokenView
