import React, {useState} from 'react'
import {Dimensions, Text, View} from 'react-native'
import TextInput from './common/TextInput';
import BaseTokenList from './BaseTokenList';
import theme from '../theme';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getDailyBlock, getTokensByName, getDailyQuotesByID} from '../utils';
import {DailyTokenData, TokenData, Id, UnitedTokenData} from '../types';

const {height} = Dimensions.get('window')


const SearchBar:React.FC = () => {
    // let tokenData: TokenData | undefined = undefined
    // let dailyTokenData: DailyTokenData | undefined = undefined

    // const [tokenData, setTokenData] = useState<TokenData>({tokens:[]})
    // const [dailyTokenData, setDailyTokenData] = useState<DailyTokenData>({tokens:[],bundles:[]})

    const [unitedTokenData, setUnitedTokenData]= useState<UnitedTokenData>({tokenData:{tokens:[]},dailyTokenData:{tokens:[],bundles:[]}})
    const [filter,setFilter] = useState<string>('')
    const ethPriceInUSD = useSelector((state:RootStateOrAny) => state.ethPrice.price)

    // let passedTokensNow = (tokenData === [] || filter === '') ? [] : tokenData.tokens
    // let passedTokensDaily = (dailyTokenData === [] || filter === '') ? [] : dailyTokenData.tokens

    return(
        <View style={{flex: 1, height: height}}>
            <TextInput
            onChangeText={
                async (text: string) => {
                    setFilter(text.toUpperCase())
                    if (text === '') {
                        setUnitedTokenData({tokenData:{tokens:[]},dailyTokenData:{tokens:[],bundles:[]}})
                    } else {
                        const newTokenData = await getTokensByName(text.toUpperCase()).then(result => result)
                        const tokenIds: Id[] = newTokenData.tokens.map(token => token.id)
                        const dailyBlock = await getDailyBlock().then(result => result)
                        const newDailyTokenData = await getDailyQuotesByID(tokenIds, dailyBlock).then(result => result)
                        setUnitedTokenData({tokenData: newTokenData, dailyTokenData: newDailyTokenData})
                    }
                }}
            value={filter}
            style={{height: 36, fontSize: 24}}
            placeholder={'Input a ticker here...'}
            />
            <Text style={{color: theme.colors.textWhite, textAlign: "center"}}> Current ETH price: ${ethPriceInUSD}</Text>
            <BaseTokenList tokensNow={unitedTokenData.tokenData} ethPriceInUSD={ethPriceInUSD} tokensDaily={unitedTokenData.dailyTokenData}/>
        </View>
    )
}

export default SearchBar
