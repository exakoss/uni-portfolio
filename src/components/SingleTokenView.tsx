import React, {useEffect, useState} from 'react'
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {ExtendedToken} from '../types';
import {getETHPrice, getTokenDataById, getBlock, calculateETHPrice, parsePriceToFixedNumber} from '../utils';
import {RootStateOrAny, useSelector} from 'react-redux';
import { useRoute } from '@react-navigation/native';
import theme from '../theme';
import {PercentageChange} from './BaseTokenList';
import {toMoney} from '../utils';

const {height} = Dimensions.get('window')

const styles = StyleSheet.create({
    tileText: {
        color: theme.colors.textWhite,
        fontSize: theme.fontsize.normal
    },
    // mainHeader: {
    //     color: theme.colors.textWhite,
    //     fontSize: theme.fontsize.large,
    //     textAlign: 'center',
    //     marginTop: theme.distance.small
    // },
    headerText: {
        color: theme.colors.textWhite,
        fontSize: theme.fontsize.big,
        textAlign: 'center',
        marginBottom: theme.distance.tiny
    },
    tokenStat: {
        borderRadius: 5,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: theme.colors.textSecondary
    }
})

export const SingleTokenStat:React.FC<{title:string, currentValue:number, previousValue: number, isUSD:boolean}> = ({title,currentValue,previousValue,isUSD}) => {
    const displayedCurrentValue = isUSD ? toMoney(currentValue,3) : currentValue
    return (
        <View style={styles.tokenStat}>
            <Text style={styles.headerText}>{title}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text style={styles.tileText}>{displayedCurrentValue}</Text>
                <PercentageChange currentPrice={currentValue} dailyPrice={previousValue}/>
            </View>
        </View>
    )
}

const SingleTokenView:React.FC = () => {
    //Extracting tokenId from the route params
    const route = useRoute();
    //@ts-ignore
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
    const dailyBlockNumber = useSelector((state:RootStateOrAny) => state.dailyBlock.blockNumber)

    useEffect(() => {
        const updateTokenData = async () => {
            //Fetching all the necessary data about the token
            const twoDaysBlock = await getBlock('TWO_DAYS').then(result => result)
            const oneDayETHPrice = await getETHPrice(dailyBlockNumber).then(result => result)
            const twoDaysETHPrice = await getETHPrice(twoDaysBlock).then(result => result)
            const currentTokenData = await getTokenDataById(tokenId).then(result => result)
            // console.log(`Current token data:`)
            // console.log(currentTokenData)
            const oneDayTokenData = await getTokenDataById(tokenId,dailyBlockNumber).then(result => result)
            // console.log(`One day token data:`)
            // console.log(oneDayTokenData)
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
        <View style={{height: height, flex: 1, backgroundColor: theme.colors.background}}>
            <Text style={styles.headerText}>{extendedToken.name}</Text>
            <SingleTokenStat title='Current Price' currentValue={extendedToken.currentPrice} previousValue={extendedToken.oneDayPrice} isUSD={true}/>
            <SingleTokenStat title='Total Liquidity' currentValue={extendedToken.currentLiquidity} previousValue={extendedToken.oneDayLiquidity} isUSD={true}/>
            <SingleTokenStat title='Volume (24hrs)' currentValue={extendedToken.currentUntrackedVolume - extendedToken.oneDayUntrackedVolume} previousValue={extendedToken.oneDayUntrackedVolume - extendedToken.twoDaysUntrackedVolume} isUSD={true}/>
            <SingleTokenStat title='Transactions (24hrs)' currentValue={extendedToken.currentTxs - extendedToken.oneDayTxs} previousValue={extendedToken.oneDayTxs - extendedToken.twoDaysTxs} isUSD={false}/>
        </View>
    )
}

export default SingleTokenView
