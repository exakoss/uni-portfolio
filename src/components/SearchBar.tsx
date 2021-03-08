import React, {useState} from 'react'
import {FlatList, View, Text} from 'react-native'
import TextInput from './common/TextInput';
import {useLazyQuery, useQuery} from '@apollo/react-hooks'
import {FIND_TOKENS_BY_NAME, ETH_PRICE_QUERY} from '../graphql/queries';
import {Dimensions} from 'react-native';
import BaseTokenList from './BaseTokenList';
import theme from '../theme';
import {RootStateOrAny, useSelector} from 'react-redux';

const {height} = Dimensions.get('window')

const SearchBar:React.FC = () => {
    const [filter,setFilter] = useState('')
    const [loadTokens, {loading: tokenLoading, data: tokenData}] = useLazyQuery(FIND_TOKENS_BY_NAME)
    const ethPriceInUSD = useSelector((state:RootStateOrAny) => state.ethPrice.price)
    // const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice
    let passedTokens = (tokenData === undefined || filter === '') ? [] : tokenData.tokens
    return(
        <View style={{flex: 1, height: height}}>
            <TextInput
            onChangeText={(text:string) => {
                setFilter(text.toUpperCase())
                loadTokens({variables: {contains: text.toUpperCase()}})
            }}
            value={filter}
            style={{height: 36, fontSize: 24}}
            />
            <Text style={{color: theme.colors.textWhite}}> Current ETH price: ${ethPriceInUSD}</Text>
            <BaseTokenList tokens={passedTokens} ethPriceInUSD={ethPriceInUSD}/>
        </View>
    )
}

export default SearchBar
