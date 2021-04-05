import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, Alert, Picker} from 'react-native';
import 'react-native-get-random-values'
import "@ethersproject/shims"
import {Wallet, BigNumber} from 'ethers';
import {RootStateOrAny, useSelector} from 'react-redux';
import Clipboard from 'expo-clipboard';
import {Ionicons} from '@expo/vector-icons';
import theme from '../../theme';
import {getCurrentBalance} from '../../utils/ethersTools';
import LoadingScreen from '../LoadingScreen';
import BaseTokenList from '../BaseTokenList';
import {UnitedTokenData} from '../../types';

const initialTokenData:UnitedTokenData = {
    tokenData:{
        tokens:[]
    },
    dailyTokenData:{
        tokens:[],
        bundles:[]
    }
}

const WalletTokenDisplay:React.FC<{value: 'ERC20'| 'ERC721',ethPriceInUSD:number}> = ({value,ethPriceInUSD}) => {
 switch (value) {
     case 'ERC20':
         return <BaseTokenList tokensNow={initialTokenData.tokenData} tokensDaily={initialTokenData.dailyTokenData} ethPriceInUSD={ethPriceInUSD} placeholder='Your token list is currently empty' isLoading={false}/>
     case 'ERC721':
         return <View style={{flex:1, backgroundColor:theme.colors.background, alignItems: 'center', justifyContent: 'center'}}>
             <Text style={{color: theme.colors.textWhite, fontSize: 24, textAlign: "center"}}>You currently don't have any NFTs</Text>
         </View>
     default:
         return <View style={{flex:1, backgroundColor:theme.colors.background}}>

         </View>
 }
}

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
    const [selectedValue, setSelectedValue] = useState<"ERC20" | "ERC721">("ERC20");

    useEffect(() => {
        const updateCurrentBalance = async () => {
            const newBalance:BigNumber = await getCurrentBalance(wallet)
            setCurrentBalance(newBalance.toNumber())
        }
        updateCurrentBalance()
        setIsLoading(false)
    },[])

    if (isLoading) return <LoadingScreen placeholder='Loading wallet data...'/>
    return(
        <View style={{backgroundColor: theme.colors.background, flexDirection:'column', flex: 1}}>
            <View style={{flexDirection: 'row',marginVertical:theme.distance.normal, justifyContent: 'center'}}>
                <Text style={{color:theme.colors.textWhite, fontSize: theme.fontsize.big}}>{wallet.address.slice(0,15) + '...'}</Text>
                <CopyButton text={wallet.address}/>
            </View>
            <View style={{alignItems:'center', marginBottom: theme.distance.normal}}>
                <Text style={{color:theme.colors.textWhite, fontSize: theme.fontsize.big}}>{currentBalance} ETH</Text>
                <Text style={{color:theme.colors.textSecondary, fontSize: theme.fontsize.big}}>${currentBalance * ethPriceInUSD}</Text>
            </View>
            <View style={{borderWidth: 1, borderColor: "grey"}}>
                <Picker
                    selectedValue={selectedValue}
                    style={{
                        height: 50,
                        color: theme.colors.textWhite
                    }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="ERC-20 Tokens" value="ERC20" />
                    <Picker.Item label="ERC-721 NFTs" value="ERC721" />
                </Picker>
            </View>
            <WalletTokenDisplay value={selectedValue} ethPriceInUSD={ethPriceInUSD}/>
        </View>
    )
}

export default WalletDisplay
