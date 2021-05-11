import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, Alert, Picker, PickerIOS} from 'react-native';
// import 'react-native-get-random-values'
// import "@ethersproject/shims"
import {Wallet, BigNumber, ethers} from 'ethers';
import {RootStateOrAny, useSelector} from 'react-redux';
import Clipboard from 'expo-clipboard';
import {Ionicons} from '@expo/vector-icons';
import theme from '../../theme';
import {getCurrentBalance} from '../../utils/ethersTools';
import LoadingScreen from '../LoadingScreen';
import TokenList from '../TokenList';
import {toMoney} from '../../utils';
import {TokenListEntry,WatchlistEntry} from '../../types';
import {addQuantitiesToTokenListEntries, getTokenListEntriesFromWatchlistEntries} from '../../utils/synthTools';

const WalletTokenDisplay:React.FC<{value: 'ERC20'| 'ERC721',isLoading:boolean, portfolioTokens:TokenListEntry[]}> = ({value,isLoading,portfolioTokens}) => {
 switch (value) {
     case 'ERC20':
            return <TokenList tokens={portfolioTokens} placeholder='Your portfolio token list is currently empty' isLoading={isLoading}/>
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
    const portfolioEntries:WatchlistEntry[] = useSelector((state:RootStateOrAny) => state.portfolio.portfolioEntries)
    console.log(portfolioEntries)
    const [currentBalance,setCurrentBalance] = useState<number>(0)
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [selectedValue, setSelectedValue] = useState<"ERC20" | "ERC721">("ERC20");
    const [portfolioTokens,setPortfolioTokens] = useState<TokenListEntry[]>([])

    useEffect(() => {
        const updateCurrentBalanceAndPortfolioTokens = async () => {
            const newBalance:BigNumber = await getCurrentBalance(wallet)
            const portfolioTokenEntries = await getTokenListEntriesFromWatchlistEntries(portfolioEntries)
            // console.log(portfolioTokenEntries)
            const portfolioTokenEntriesWithQuantity = await addQuantitiesToTokenListEntries(portfolioTokenEntries,wallet)
            console.log(portfolioTokenEntriesWithQuantity)
            setCurrentBalance(Number(ethers.utils.formatEther(newBalance)))
            setPortfolioTokens(portfolioTokenEntriesWithQuantity)
        }
        setIsLoading(true)
        updateCurrentBalanceAndPortfolioTokens()
        setIsLoading(false)
    },[wallet])

    if (isLoading) return <LoadingScreen placeholder='Loading wallet data...'/>
    return(
        <View style={{backgroundColor: theme.colors.background, flexDirection:'column', flex: 1, justifyContent:'flex-start'}}>
            <View style={{flexDirection: 'row',marginVertical:theme.distance.normal, justifyContent: 'center'}}>
                <Text style={{color:theme.colors.textWhite, fontSize: theme.fontsize.big}}>{wallet.address.slice(0,15) + '...'}</Text>
                <CopyButton text={wallet.address}/>
            </View>
            <View style={{alignItems:'center'}}>
                <Text style={{color:theme.colors.textWhite, fontSize: theme.fontsize.big}}>{currentBalance} ETH</Text>
                <Text style={{color:theme.colors.textSecondary, fontSize: theme.fontsize.big}}>{toMoney(currentBalance*ethPriceInUSD,2)}</Text>
            </View>
            {/*Fix picker on iOS and look at AirBnb app for inspiration*/}
            <View style={{flex: 1, alignItems: "center", marginTop: -25}}>
                <Picker
                    selectedValue={selectedValue}
                    style={{
                        height: 70,
                        width: 200,
                        color: theme.colors.textWhite
                    }}
                    itemStyle={{
                        color: theme.colors.textWhite
                    }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="ERC-20 Tokens" value="ERC20" />
                    <Picker.Item label="ERC-721 NFTs" value="ERC721" />
                </Picker>
            </View>
            <View style={{flex: 1, marginTop: -200}}>
                <WalletTokenDisplay value={selectedValue} isLoading={isLoading} portfolioTokens={portfolioTokens}/>
            </View>

        </View>
    )
}

export default WalletDisplay
