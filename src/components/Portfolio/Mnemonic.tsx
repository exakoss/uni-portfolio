import React, {useState, useEffect} from 'react'
import {View, Button, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import theme from '../../theme';
import { Wallet } from 'ethers'
import {createRinkebyWallet} from '../../utils/ethersTools';
import LoadingScreen from '../LoadingScreen';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {setWallet} from '../../reducers/walletReducer';
import TouchableButton from '../common/TouchableButton';

export const MnemonicPhraseView:React.FC<{phrase: string| undefined}> = ({phrase}) => {
    if (!phrase) return null
    const mnemonicPhrase = phrase.split(" ")
    return(
        <View style={{flexDirection:"row", flexWrap:"wrap", justifyContent:'center', marginTop:theme.distance.normal}}>
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
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const newWallet = createRinkebyWallet()
        dispatch(setWallet(newWallet))
        setIsLoading(false)
    },[])
    const connectedWallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)
    if (isLoading) return <LoadingScreen placeholder='Generating a wallet...'/>

    return(
        <View style={{flex: 1,backgroundColor: theme.colors.background, alignItems: "center", justifyContent:'center'}}>
            <MnemonicPhraseView phrase={connectedWallet?.mnemonic.phrase}/>
            <TouchableButton text='Set up the password' onPress={() => navigation.navigate('PasswordInput')}/>
        </View>
    )
}

export default Mnemonic
