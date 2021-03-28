import React from 'react'
import {View, Button, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native'

const Mnemonic:React.FC = () => {
    const navigation = useNavigation()

    return(
        <View>
            <Text>This is portfolio mnemonic screen</Text>
            <Button title='Go to the next screen' onPress={() => navigation.navigate('WalletDisplay')}/>
        </View>
    )
}

export default Mnemonic
