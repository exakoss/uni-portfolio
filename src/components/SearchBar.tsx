import React, {useState} from 'react'
import {Dimensions, Text, View} from 'react-native'
import TextInput from './common/TextInput';
import BaseTokenList from './BaseTokenList';
import theme from '../theme';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getBlock, getTokensByName, getDailyQuotesByID} from '../utils';
import {Id, UnitedTokenData} from '../types';
// import {useDebounce} from 'use-debounce'
import CurrentETHPrice from './CurrentETHPrice';

const {height} = Dimensions.get('window')

const initialTokenData:UnitedTokenData = {
    tokenData:{
        tokens:[]
    },
    dailyTokenData:{
        tokens:[],
        bundles:[]
    }
}

const SearchBar:React.FC = () => {

    const [unitedTokenData, setUnitedTokenData]= useState<UnitedTokenData>(initialTokenData)
    const [filter,setFilter] = useState<string>('')
    // const [filterValue] = useDebounce(filter,400)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const ethPriceInUSD = useSelector((state:RootStateOrAny) => state.ethPrice.price)
    const dailyBlockNumber = useSelector((state:RootStateOrAny) => state.dailyBlock.blockNumber)
    console.log(`Daily block from the state: ${dailyBlockNumber}`)
    const listPlaceholder = 'Please input a ticker in the searchbar...'

    return(
        <View style={{flex: 1, height: height}}>
            <CurrentETHPrice/>
            <TextInput
            //This is ugly but works for now. Rebuild later with useEffect and useDebounce
            //@ts-ignore
            onChangeText={
                async (text: string) => {
                    setIsLoading(true)
                    setFilter(text.toUpperCase())
                    if (text === '') {
                        setUnitedTokenData(initialTokenData)
                    } else {
                        const newTokenData = await getTokensByName(text.toUpperCase()).then(result => result)
                        const tokenIds: Id[] = newTokenData.tokens.map(token => token.id)
                        const newDailyTokenData = await getDailyQuotesByID(tokenIds, dailyBlockNumber).then(result => result)
                        setUnitedTokenData({tokenData: newTokenData, dailyTokenData: newDailyTokenData})
                    }
                    setIsLoading(false)
                }}
            value={filter}
            placeholder={'Input a ticker here...'}
            />

            <BaseTokenList tokensNow={unitedTokenData.tokenData} ethPriceInUSD={ethPriceInUSD} tokensDaily={unitedTokenData.dailyTokenData} placeholder={listPlaceholder} isLoading={isLoading}/>
        </View>
    )
}

export default SearchBar
