import React from 'react'
import {BasicToken} from '../graphql/queries'
import {View, Text, FlatList, StyleSheet, Image} from 'react-native'
import theme from '../theme'

interface Props {
    tokens: BasicToken[] | [],
    ethPriceInUSD: string
}

const styles = StyleSheet.create({
    tile: {
        backgroundColor: theme.colors.textSecondary,
        display: 'flex',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    separator: {
        height: theme.distance.small,
        color: theme.colors.background
    }
})

const ItemSeparator = () => <View style={styles.separator} />;

const TokenTile:React.FC<{ token: BasicToken, ethPriceInUSD: string }> = ({token,ethPriceInUSD}) => {
    return(
        <View style={styles.tile}>
            <Image style={{height: 30}} source={{uri: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x37236CD05b34Cc79d3715AF2383E96dd7443dCF1/logo.png'}} />
            <Text style={{color: theme.colors.textWhite, fontSize: 30 }}>{token.symbol}</Text>
            <Text style={{color: theme.colors.textWhite, fontSize: 30 }}> ${(parseFloat(token.derivedETH as string) * parseFloat(ethPriceInUSD)).toFixed(4)}</Text>
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
