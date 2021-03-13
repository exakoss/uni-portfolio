import React from 'react'
import {BasicToken, DailyTokenData, TokenData, BasicTokenDailyPrice, PriceEntry} from '../types'
import {View, Text, FlatList, StyleSheet, Button} from 'react-native'
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {addTokenId, removeTokenId} from '../reducers/tokenReducer';
import theme from '../theme'
import {calculateETHPrice, parsePriceToFixedNumber} from '../utils';

interface Props {
    tokensNow: TokenData,
    tokensDaily: DailyTokenData,
    ethPriceInUSD: number
}

const styles = StyleSheet.create({
    tile: {
        backgroundColor: theme.colors.textSecondary,
        display: 'flex',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    separator: {
        height: theme.distance.small,
        color: theme.colors.background
    },
    button: {
        borderRadius: 20,
        height: 40
    },
    tileText: {
        color: theme.colors.textWhite,
        fontSize: 30
    },
    positivePercentage: {
        color: theme.colors.green,
        fontSize: 30
    },
    negativePercentage: {
        color: theme.colors.warning,
        fontSize: 30
    }
})

const ItemSeparator = () => <View style={styles.separator} />;

const PercentageChange:React.FC<{currentPrice: number, dailyPrice: number}> = ({currentPrice, dailyPrice}) => {
    if (dailyPrice === 0) return <Text style={styles.tileText}>-</Text>

    const pricePercDiff = 100 * ((currentPrice - dailyPrice) / ((currentPrice + dailyPrice) / 2))
    const displayedDiff = Math.abs(pricePercDiff).toFixed(2)
    if (pricePercDiff > 0) {
        return <Text style={styles.positivePercentage}>{displayedDiff}%</Text>
    } else {
        return <Text style={styles.negativePercentage}>{displayedDiff}%</Text>
    }
}

const AddDeleteButton:React.FC<{token: BasicTokenDailyPrice, isInList: boolean}> = ({token,isInList}) => {
    const dispatch = useDispatch()
    if (isInList) {
        return (
            <View style={styles.button}>
                <Button title='X' color='red' onPress={() => dispatch(removeTokenId(token.id))} />
            </View>
        )
    } else {
        return (
            <View style={styles.button}>
                <Button title='+' color='green' onPress={() => dispatch(addTokenId(token.id))} />
            </View>
        )
    }
}

const TokenTile:React.FC<{ token: BasicTokenDailyPrice, ethPriceInUSD: number }> = ({token,ethPriceInUSD}) => {
    const idList = useSelector((state:RootStateOrAny) => state.tokenIds)
    const isInList:boolean = !!(idList.tokenIds.includes(token.id))
    const currentPrice:number = calculateETHPrice(token.derivedETH, ethPriceInUSD)
    return(
        <View style={styles.tile}>
            <Text style={styles.tileText}>{token.symbol}</Text>
            <Text style={styles.tileText}> ${currentPrice}</Text>
            <PercentageChange currentPrice={currentPrice} dailyPrice={token.dailyPrice}/>
            <AddDeleteButton token={token} isInList={isInList}/>
        </View>
    )
}

const BaseTokenList:React.FC<Props> = ({tokensNow,tokensDaily,ethPriceInUSD}) => {
    // console.log('Passed token data:')
    // console.log(tokensNow)
    // console.log('Passed daily data:')
    // console.log(tokensDaily)
    if (tokensNow.tokens.length === 0 || tokensDaily.tokens.length === 0 ) return <View style={{flex: 1}}><Text style={{color: theme.colors.textWhite, fontSize: 24, textAlign: "center"}}>Please type in the token ticker...</Text></View>
    else {
        // const dailyETHPriceInUSD:number = Number(parseFloat(tokensDaily.bundles[0].ethPrice).toFixed(2))
        const dailyETHPriceInUSD:number = parsePriceToFixedNumber(tokensDaily.bundles[0].ethPrice)
        const priceEntries:PriceEntry[] = tokensDaily.tokens.map(token => {
            return {
                id: token.id,
                price: calculateETHPrice(token.derivedETH,dailyETHPriceInUSD)
            }
            })
        // console.log('Price entries:')
        // console.log(priceEntries)
        const passedTokens:BasicTokenDailyPrice[] = tokensNow.tokens.map(token => {
            console.log('Iterating token id:')
            console.log(token.id)
            // @ts-ignore
            const dailyPrice:number = (priceEntries.find(p => p.id === token.id) === undefined) ? 0 : priceEntries.find(p => p.id === token.id).price
            return {
                ...token,
                dailyPrice: dailyPrice
            }
        })
        return (
        <View style={{flex: 1}}>
            <FlatList data={passedTokens}
                      ItemSeparatorComponent={ItemSeparator}
                      renderItem={({item}) => <TokenTile token={item} ethPriceInUSD={ethPriceInUSD}/>}
            />
        </View>
    )}

}

export default BaseTokenList
