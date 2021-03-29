import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Registration from '../Portfolio/Registration';
import Mnemonic from '../Portfolio/Mnemonic';
import WalletDisplay from '../Portfolio/WalletDisplay';

const PortfolioNavigator:React.FC = () => {
    const Portfolio = createStackNavigator()
    return (
        <Portfolio.Navigator
        initialRouteName='Registration'
        screenOptions={{
            headerShown: false
        }}
        >
            <Portfolio.Screen name='Registration' component={Registration}/>
            <Portfolio.Screen name='Mnemonic' component={Mnemonic}/>
            <Portfolio.Screen name='WalletDisplay' component={WalletDisplay}/>
        </Portfolio.Navigator>
    )
}

export default PortfolioNavigator
