import React from 'react'
import {DailyTokenData, TokenData, BasicTokenDailyPrice, PriceEntry} from '../types'
import {View, Text, FlatList, StyleSheet, Button, TouchableOpacity} from 'react-native'
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux'
import {addTokenId, removeTokenId} from '../reducers/tokenReducer'
import theme, {commonStyles} from '../theme'
import {calculateETHPrice, parsePriceToFixedNumber, toMoney} from '../utils'
import { useNavigation } from '@react-navigation/native'
import LoadingScreen from './LoadingScreen'

interface Props {
    tokensNow: TokenData,
    tokensDaily: DailyTokenData,
    ethPriceInUSD: number,
    placeholder: string,
    isLoading: boolean
}

const styles = StyleSheet.create({
    separator: {
        height: theme.distance.small,
        color: theme.colors.background
    },
    button: {
        borderRadius: 10,
        fontSize: 30,
        height: 40,
        width:40,
        backgroundColor: '#e0c68b'
    },
    tileText: {
        color: theme.colors.textWhite,
        fontSize: theme.fontsize.normal
    },
    nameText: {
      color: theme.colors.textSecondary,
      fontSize: theme.fontsize.small,
    },
    positivePercentage: {
        color: theme.colors.green,
        fontSize: theme.fontsize.normal
    },
    negativePercentage: {
        color: theme.colors.warning,
        fontSize: theme.fontsize.normal
    },
    nameContainer: {
        display: "flex",
        flexDirection:"column"
    },
    placeholder: {
        color: theme.colors.textWhite,
        fontSize: theme.fontsize.big,
        textAlign: "center"
    }
})

export const ItemSeparator = () => <View style={styles.separator} />;

export const PercentageChange:React.FC<{currentPrice: number, dailyPrice: number}> = ({currentPrice, dailyPrice}) => {
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
        <View style={commonStyles.tile}>
            <View style={styles.nameContainer}>
                <Text style={styles.tileText}>{token.symbol}</Text>
                <Text style={styles.nameText}>{token.name}</Text>
            </View>
            <Text style={styles.tileText}> {toMoney(currentPrice,3)}</Text>
            <PercentageChange currentPrice={currentPrice} dailyPrice={token.dailyPrice}/>
            <AddDeleteButton token={token} isInList={isInList}/>
        </View>
    )
}

const BaseTokenList:React.FC<Props> = ({tokensNow,tokensDaily,ethPriceInUSD,placeholder,isLoading}) => {
    if (isLoading) return <LoadingScreen placeholder='Loading token data...'/>
    const navigation = useNavigation()
    if (tokensNow.tokens.length === 0 || tokensDaily.tokens.length === 0 ) return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text style={{color: theme.colors.textWhite, fontSize: 24, textAlign: "center"}}>{placeholder}</Text></View>
    else {
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
            // console.log('Iterating token id:')
            // console.log(token.id)
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
                      renderItem={({item}) =>
                          <TouchableOpacity onPress={() => navigation.navigate('SingleTokenView',{tokenId: item.id, tokenSymbol: item.symbol, tokenName: item.name})}>
                            <TokenTile token={item} ethPriceInUSD={ethPriceInUSD}/>
                          </TouchableOpacity>
                      }
            />
        </View>
    )}
}

export default BaseTokenList
