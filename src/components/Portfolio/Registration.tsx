import React from 'react'
import {View, Button, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native'

const Registration:React.FC = () => {
    const navigation = useNavigation()

    return(
        <View>
            <Text>This is portfolio registration screen</Text>
            <Button title='Go to the next screen' onPress={() => navigation.navigate('Mnemonic')}/>
        </View>
    )
}

export default Registration
