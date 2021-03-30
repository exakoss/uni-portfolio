import React, {useState, useEffect} from 'react'
import {View, Button, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import theme from '../../theme';
import { Wallet } from 'ethers'
import {createRinkebyWallet} from '../../utils/ethersTools';
import LoadingScreen from '../LoadingScreen';

export const MnemonicPhraseView:React.FC<{phrase: string| undefined}> = ({phrase}) => {
    if (!phrase) return null
    const mnemonicPhrase = phrase.split(" ")
    return(
        <View style={{flexDirection:"row", flexWrap:"wrap", justifyContent:'center'}}>
            {mnemonicPhrase.map(w => {
                    return(
                        <View style={{borderRadius: 5,
                            margin: 10,
                            padding: 10,
                            borderWidth: 2,
                            borderColor: theme.colors.textSecondary}}
                            key = {w}
                        >
                            <Text style={{color: theme.colors.textWhite, fontSize: theme.fontsize.normal}}>{w}</Text>
                        </View>
                    )
                })}
        </View>
    )
}

const Mnemonic:React.FC = () => {
    const navigation = useNavigation()
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [connectedWallet, setConnectedWallet] = useState<Wallet>()

    useEffect(() => {
        const newWallet = createRinkebyWallet()
        setConnectedWallet(newWallet)
        setIsLoading(false)
    },[])

    if (isLoading) return <LoadingScreen/>

    return(
        <View style={{flex: 1,backgroundColor: theme.colors.background, alignItems: "center", justifyContent:'center'}}>
            <MnemonicPhraseView phrase={connectedWallet?.mnemonic.phrase}/>
        </View>
    )
}

export default Mnemonic
