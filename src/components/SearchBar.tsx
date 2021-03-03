import React, {useState} from 'react'
import {FlatList, View, Text} from 'react-native'
import TextInput from './common/TextInput';
import {useQuery} from '@apollo/react-hooks'
import {FIND_TOKENS_BY_NAME, BasicToken, ETH_PRICE_QUERY} from '../graphql/queries';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window')

const SearchBar:React.FC = () => {
    const [filter,setFilter] = useState('')
    const {data: tokenData,loading: tokenLoading} = useQuery(FIND_TOKENS_BY_NAME,{variables:{contains: "X"}})
    const {loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
    if (ethLoading || tokenLoading) return <Text>Loading token data...</Text>

    const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice

    return(
        <View style={{flex: 1, height: height}}>
            <TextInput// @ts-ignore
            onChangeText={text => setFilter(text)}
            value={filter}/>
            <Text> Current ETH price: ${parseFloat(ethPriceInUSD).toFixed(2)}</Text>
            <FlatList data={tokenData.tokens} renderItem={({item}) => <View>
                <Text>{item.symbol} ${(parseFloat(item.derivedETH) * parseFloat(ethPriceInUSD)).toFixed(2)}</Text>
            </View>}/>
        </View>
    )
}

export default SearchBar
