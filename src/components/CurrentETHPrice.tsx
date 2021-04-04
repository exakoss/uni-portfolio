import React from 'react';
import {Text, View} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import theme from '../theme';

const CurrentETHPrice:React.FC = () => {
    const ethPriceInUSD = useSelector((state:RootStateOrAny) => state.ethPrice.price)

    return (
        <View style={{
            borderBottomWidth: 1,
            borderBottomColor: "grey",
            backgroundColor: theme.colors.background
        }}>
            <Text style={{color: theme.colors.textWhite, textAlign: "center", fontSize: theme.fontsize.normal}}> 1 ETH = ${ethPriceInUSD}</Text>
        </View>
    )
}

export default CurrentETHPrice
