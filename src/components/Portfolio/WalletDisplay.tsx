import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import 'react-native-get-random-values'
import "@ethersproject/shims"
import {Wallet, BigNumber} from 'ethers';
import {RootStateOrAny, useSelector} from 'react-redux';
import Clipboard from 'expo-clipboard';
import {Ionicons} from '@expo/vector-icons';
import theme from '../../theme';
import {getCurrentBalance} from '../../utils/ethersTools';
import LoadingScreen from '../LoadingScreen';

const CopyButton:React.FC<{text:string}> = ({text}) => {
    return(
        <TouchableOpacity onPress={() => {
            Clipboard.setString(text)
            Alert.alert('Copied the wallet address!')
        }}>
            <Ionicons name='copy-outline' style={{fontSize:theme.fontsize.big, color:theme.colors.textWhite}}/>
        </TouchableOpacity>
    )
}

const WalletDisplay:React.FC = () => {
    const wallet:Wallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)
    const ethPriceInUSD = useSelector((state:RootStateOrAny) => state.ethPrice.price)
    const [currentBalance,setCurrentBalance] = useState<number>(0)
    const [isLoading,setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const updateCurrentBalance = async () => {
            const newBalance:BigNumber = await getCurrentBalance(wallet)
            setCurrentBalance(newBalance.toNumber())
        }
        updateCurrentBalance()
        setIsLoading(false)
    },[])

    if (isLoading) return <LoadingScreen/>
    return(
        <View style={{backgroundColor: theme.colors.background, flexDirection:'column', flex: 1}}>
            <View style={{flexDirection: 'row',marginVertical:theme.distance.normal, justifyContent: 'center'}}>
                <Text style={{color:theme.colors.textWhite, fontSize: theme.fontsize.big}}>{wallet.address.slice(0,15) + '...'}</Text>
                <CopyButton text={wallet.address}/>
            </View>
            <View style={{alignItems:'center'}}>
                <Text style={{color:theme.colors.textWhite, fontSize: theme.fontsize.big}}>{currentBalance} ETH</Text>
                <Text style={{color:theme.colors.textSecondary, fontSize: theme.fontsize.big}}>${currentBalance * ethPriceInUSD}</Text>
            </View>
        </View>
    )
}

export default WalletDisplay
