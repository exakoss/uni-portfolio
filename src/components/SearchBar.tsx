import React, {useState} from 'react'
import {Dimensions, Text, View} from 'react-native'
import TextInput from './common/TextInput';
import BaseTokenList from './BaseTokenList';
import theme from '../theme';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getBlock, getTokensByName, getDailyQuotesByID} from '../utils';
import {Id, UnitedTokenData} from '../types';

const {height} = Dimensions.get('window')

const SearchBar:React.FC = () => {

    const [unitedTokenData, setUnitedTokenData]= useState<UnitedTokenData>({tokenData:{tokens:[]},dailyTokenData:{tokens:[],bundles:[]}})
    const [filter,setFilter] = useState<string>('')
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const ethPriceInUSD = useSelector((state:RootStateOrAny) => state.ethPrice.price)
    const dailyBlockNumber = useSelector((state:RootStateOrAny) => state.dailyBlock.blockNumber)
    console.log(`Daily block from the state: ${dailyBlockNumber}`)
    const listPlaceholder = 'Please input a ticker in the searchbar...'

    return(
        <View style={{flex: 1, height: height}}>
            <Text style={{color: theme.colors.textWhite, textAlign: "center", fontSize: theme.fontsize.normal}}> Current ETH price: ${ethPriceInUSD}</Text>
            <TextInput
            onChangeText={
                async (text: string) => {
                    setIsLoading(true)
                    setFilter(text.toUpperCase())
                    if (text === '') {
                        setUnitedTokenData({tokenData:{tokens:[]},dailyTokenData:{tokens:[],bundles:[]}})
                    } else {
                        const newTokenData = await getTokensByName(text.toUpperCase()).then(result => result)
                        const tokenIds: Id[] = newTokenData.tokens.map(token => token.id)
                        const newDailyTokenData = await getDailyQuotesByID(tokenIds, dailyBlockNumber).then(result => result)
                        setUnitedTokenData({tokenData: newTokenData, dailyTokenData: newDailyTokenData})
                    }
                    setIsLoading(false)
                }}
            value={filter}
            style={{height: 36, fontSize: 24}}
            placeholder={'Input a ticker here...'}
            />

            <BaseTokenList tokensNow={unitedTokenData.tokenData} ethPriceInUSD={ethPriceInUSD} tokensDaily={unitedTokenData.dailyTokenData} placeholder={listPlaceholder} isLoading={isLoading}/>
        </View>
    )
}

export default SearchBar
