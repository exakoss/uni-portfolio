import React from 'react'
import {BasicToken} from '../types'
import {View, Text, FlatList, StyleSheet, Image, Button} from 'react-native'
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {addTokenId, removeTokenId} from '../reducers/tokenReducer';
import theme from '../theme'

interface Props {
    tokens: BasicToken[] | [],
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
    }
})

const ItemSeparator = () => <View style={styles.separator} />;

const AddDeleteButton:React.FC<{token: BasicToken, isInList: boolean}> = ({token,isInList}) => {
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

const TokenTile:React.FC<{ token: BasicToken, ethPriceInUSD: number }> = ({token,ethPriceInUSD}) => {

    const idList = useSelector((state:RootStateOrAny) => state.tokenIds)
    const isInList:boolean = !!(idList.tokenIds.includes(token.id))
    return(
        <View style={styles.tile}>
            <Text style={{color: theme.colors.textWhite, fontSize: 30 }}>{token.symbol}</Text>
            <Text style={{color: theme.colors.textWhite, fontSize: 30 }}> ${(parseFloat(token.derivedETH as string) * ethPriceInUSD).toFixed(4)}</Text>
            <AddDeleteButton token={token} isInList={isInList}/>
        </View>
    )
}

const BaseTokenList:React.FC<Props> = ({tokens,ethPriceInUSD}) => {
    if (tokens === []) return <Text>Please type in the token filter...</Text>
    else return (
        <View style={{flex: 1}}>
            <FlatList data={tokens}
                      ItemSeparatorComponent={ItemSeparator}
                      renderItem={({item}) => <TokenTile token={item} ethPriceInUSD={ethPriceInUSD}/>}
            />
        </View>
    )

}

export default BaseTokenList
