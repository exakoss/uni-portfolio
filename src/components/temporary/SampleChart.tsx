import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native'

// import {createConnectedSnxjs} from '../../utils/synthTools';
import {estimateGasLimitForExchange} from '../../utils/transactions';
import theme from '../../theme';
import {Wallet} from 'ethers';
import {RootStateOrAny, useSelector} from 'react-redux';
import {Network, synthetix} from '@synthetixio/js'

const SampleChart:React.FC = () => {
    const [gasLimit,setGasLimit] = useState<number>(0)
    const wallet:Wallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)

    useEffect(() => {
        const updateGasLimit = async () => {
            const snxjs = synthetix({signer:wallet})
            const currentGasLimit = await estimateGasLimitForExchange(snxjs, 'sUSD', 300, 'sETH')
            // @ts-ignore
            setGasLimit(currentGasLimit)
        }
        updateGasLimit()
    },[])

    return(
        <View style={{flex: 1}}>
            <Text style={{color:theme.colors.textWhite}}>{gasLimit}</Text>
        </View>
    )
}

export default SampleChart
