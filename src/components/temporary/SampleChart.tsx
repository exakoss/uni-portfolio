import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native'
import theme from '../../theme';
import {Wallet} from 'ethers';
import {RootStateOrAny, useSelector} from 'react-redux';
import {Network, synthetix} from '@synthetixio/js'
import {getContractCurrentBalance} from '../../utils/ethersTools';

const SampleChart:React.FC = () => {
    const [sLTCBalance,setsLTCBalance] = useState<number>(0)
    const wallet:Wallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)
    const sLTCAddress = '0xcffb601e31d4f1d967aac24f742deeb2459a2e18'

    useEffect(() => {
        const updatesLTCBalance = async () => {
            const newsLTCBalance = await getContractCurrentBalance(wallet,sLTCAddress)
            setsLTCBalance(newsLTCBalance)
        }
        updatesLTCBalance()
    },[])

    return(
        <View style={{flex: 1}}>
            <Text style={{color:theme.colors.textWhite}}>{sLTCBalance}</Text>
        </View>
    )
}

export default SampleChart
