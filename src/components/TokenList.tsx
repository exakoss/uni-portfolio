import React from 'react'
import {Alert, Text, View, FlatList, TouchableOpacity, Button} from 'react-native'
import {TokenListEntry, WatchlistEntry} from '../types';
import theme, {commonStyles} from '../theme';
import {toMoney, isTokenListEntryIncluded, transformTokenListEntryToWatchlistEntry} from '../utils';
import LoadingScreen from './LoadingScreen';
import {useNavigation} from '@react-navigation/native';
import {Wallet} from 'ethers';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {removeWatchlistEntry, addWatchlistEntry} from '../reducers/watchlistReducer';


interface Props {
    tokens: TokenListEntry[],
    placeholder: string,
    isLoading: boolean
}

export const PercentageChange:React.FC<{currentPrice: number, dailyPrice: number}> = ({currentPrice, dailyPrice}) => {
    if (dailyPrice === 0) return <Text style={commonStyles.tileText}>-</Text>
    const pricePercDiff = 100 * ((currentPrice - dailyPrice) / ((currentPrice + dailyPrice) / 2))
    const displayedDiff = Math.abs(pricePercDiff).toFixed(2)
    if (pricePercDiff > 0) {
        return <Text style={commonStyles.positivePercentage}>{displayedDiff}%</Text>
    } else {
        return <Text style={commonStyles.negativePercentage}>{displayedDiff}%</Text>
    }
}

export const ItemSeparator = () => <View style={commonStyles.separator} />

const AddDeleteButton:React.FC<{token: TokenListEntry,isIncluded:boolean}> = ({token,isIncluded}) => {
    const dispatch = useDispatch()
    if (isIncluded) {
        return (
            <View style={commonStyles.button}>
                <Button title='X' color='red' onPress={() => dispatch(removeWatchlistEntry(transformTokenListEntryToWatchlistEntry(token)))}/>
            </View>
        )
    } else {
        return (
            <View style={commonStyles.button}>
                <Button title='+' color='green' onPress={() => dispatch(addWatchlistEntry(transformTokenListEntryToWatchlistEntry(token)))}/>
            </View>
        )
    }
}

const TokenListTile:React.FC<{token: TokenListEntry}> = ({token}) => {
    const watchlistEntries = useSelector((state:RootStateOrAny) => state.watchlist.watchlistEntries)
    const isIncluded:boolean = isTokenListEntryIncluded(token,watchlistEntries)
    return (
        <View style={commonStyles.tile}>
            <View style={commonStyles.nameContainer}>
                <Text style={commonStyles.tileText}>{token.name}</Text>
                <Text style={commonStyles.nameText}>{token.description}</Text>
            </View>
            <Text style={commonStyles.tileText}> {toMoney(token.formattedRate,3)}</Text>
            {(token.quantity) ? <Text style={commonStyles.tileText}>{token.quantity.toFixed(3)}</Text> : null}
            <PercentageChange currentPrice={token.formattedRate} dailyPrice={token.formattedRateDaily}/>
            <AddDeleteButton token={token} isIncluded={isIncluded}/>
        </View>
    )
}

const TokenList:React.FC<Props> = ({tokens,placeholder,isLoading}) => {

    const navigation = useNavigation()
    const wallet:Wallet | undefined = useSelector((state:RootStateOrAny) => state.wallet.wallet)

    if (isLoading) return <LoadingScreen placeholder='Loading token data...'/>
    if (tokens.length === 0) return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text style={commonStyles.placeholder}>{placeholder}</Text></View>

    const handleNavigation = (wallet:Wallet | undefined, token:TokenListEntry) => {
        if (!wallet) {
            Alert.alert(`You do not have any signer connected. Please switch to Portfolio tab to log in or create a wallet.`)
        } else if (token.dataSource === 'SYNTH') {
            navigation.navigate('SingleSynthView',{synthName: token.name})
        } else {
            navigation.navigate('SingleTokenView',{tokenId: token.address, tokenSymbol: token.name, tokenName: token.description})
        }
    }

    return(
        <View style={{flex: 1}}>
            <FlatList data={tokens}
                      ItemSeparatorComponent={ItemSeparator}
                      keyExtractor={(item,index) => index.toString()}
                      renderItem={({item}) =>
                          <TouchableOpacity onPress={() => handleNavigation(wallet,item)}>
                              <TokenListTile token={item} key={item.name}/>
                          </TouchableOpacity>
                      }
            />
        </View>
    )
}

export default TokenList
