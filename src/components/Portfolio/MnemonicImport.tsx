import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import theme, {commonStyles} from '../../theme';
import FormikTextInput from '../common/FormikTextInput';
import {Formik} from 'formik';
import {MnemonicPhraseView} from './Mnemonic';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import TouchableButton from '../common/TouchableButton';
import {ethers} from 'ethers'
import {createKovanProvider} from '../../utils/ethersTools';
import {setWallet} from '../../reducers/walletReducer';
import LoadingScreen from '../LoadingScreen';

const MnemonicImport:React.FC = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [currentPhrase,setCurrentPhrase] = useState('')
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isEditable,setIsEditable] = useState<boolean>(true)


    useEffect(() => {
        if (currentPhrase.split(' ').length === 12) {
            setIsEditable(false)
        }
    },[currentPhrase])

    const onSubmit = () => {
        setIsLoading(true)
        const newKovanProvider = createKovanProvider()
        const newWallet = ethers.Wallet.fromMnemonic(currentPhrase).connect(newKovanProvider)
        dispatch(setWallet(newWallet))
        navigation.navigate('PasswordInput')
    }
    if (isLoading) return <View style={{flex: 1}}><LoadingScreen placeholder='Generating a wallet...'/></View>
    return(
        <View style={{flex: 1, backgroundColor: theme.colors.background, paddingTop: theme.distance.small}}>
            <Formik initialValues={{phraseWord:''}} onSubmit={onSubmit}>
                {({handleSubmit, setFieldValue}) => (
                    <View>
                        <FormikTextInput name='phraseWord'
                                         //@ts-ignore
                                         autoCapitalize="none"
                                         editable={isEditable}
                                         placeholder='Input your mnemonic phrase here'
                                         addOnChange={(text) => {
                            if (text.slice(-1) === ' ') {
                                if (currentPhrase === ''){
                                    setCurrentPhrase(currentPhrase.concat(text.slice(0, text.length-1)))
                                } else {
                                    setCurrentPhrase(currentPhrase.concat(' ',text.slice(0, text.length-1)))
                                }
                                setFieldValue('phraseWord','')
                            }
                        }}/>
                        <MnemonicPhraseView phrase={currentPhrase}/>
                        <TouchableButton text='Import the wallet' onPress={handleSubmit}/>
                    </View>
                    )}
            </Formik>
        </View>
    )
}

export default MnemonicImport
