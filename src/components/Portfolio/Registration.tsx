import React from 'react'
import {View, Button, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import theme from '../../theme';

const Registration:React.FC = () => {
    const navigation = useNavigation()

    return(
        <View style={{flex: 1, backgroundColor: theme.colors.background, alignItems: "center", justifyContent:'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View style={{margin:theme.distance.small, borderWidth: 2, padding: theme.distance.small}}>
                    <Text style={{color:theme.colors.textWhite, fontSize: theme.fontsize.big}}>Log in into an existing wallet</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Mnemonic')}>
                <View style={{margin:theme.distance.small, borderWidth: 2, padding: theme.distance.small}}>
                    <Text style={{color:theme.colors.textWhite, fontSize: theme.fontsize.big}}>Create a new wallet</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Registration
