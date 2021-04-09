import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import theme from '../theme';
import {toMoney} from '../utils';

type HeaderToken = 'ETH' | 'SXN'

const CurrentPriceHeader:React.FC<{headerToken: HeaderToken}> = ({headerToken}) => {
    const ethPriceInUSD = useSelector((state:RootStateOrAny) => state.ethPrice.price)
    const snxPriceInUSD = useSelector((state:RootStateOrAny) => state.snxPrice.price)

    // const [tokenPrice,setTokenPrice] = useState<number>(0)

    // useEffect(() => {
    //     switch (headerToken) {
    //         case 'ETH':
    //             setTokenPrice(ethPriceInUSD)
    //             break;
    //         case 'SXN':
    //             setTokenPrice(snxPriceInUSD)
    //             break;
    //     }
    // },[ethPriceInUSD, snxPriceInUSD])

      return(
          <View style={{
              borderBottomWidth: 1,
              borderBottomColor: "grey",
              backgroundColor: theme.colors.background,
              flexDirection: "row",
              justifyContent: 'space-evenly'
          }}>
              <Text style={{color: theme.colors.textWhite, textAlign: "center", fontSize: theme.fontsize.normal}}> 1 ETH = {toMoney(ethPriceInUSD)}</Text>
              <Text style={{color: theme.colors.textWhite, textAlign: "center", fontSize: theme.fontsize.normal}}> 1 SNX = {toMoney(snxPriceInUSD)} </Text>
          </View>
      )
}

export default CurrentPriceHeader
