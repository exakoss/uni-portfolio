import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import theme from '../theme';
import {toMoney} from '../utils';

const CurrentPriceHeader:React.FC = () => {
    const ethPriceInUSD = useSelector((state:RootStateOrAny) => state.ethPrice.price)
    const snxPriceInUSD = useSelector((state:RootStateOrAny) => state.snxPrice.price)

      return(
          <View style={{
              borderBottomWidth: 1,
              borderBottomColor: "grey",
              backgroundColor: theme.colors.background,
              flexDirection: "row",
              justifyContent: 'space-evenly'
          }}>
              <Text style={{color: theme.colors.textWhite, textAlign: "center", fontSize: theme.fontsize.normal}}> 1 ETH = {toMoney(ethPriceInUSD,2)}</Text>
              <Text style={{color: theme.colors.textWhite, textAlign: "center", fontSize: theme.fontsize.normal}}> 1 SNX = {toMoney(snxPriceInUSD,2)} </Text>
          </View>
      )
}

export default CurrentPriceHeader
