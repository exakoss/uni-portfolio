import React, {useState,useEffect} from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Registration from '../Portfolio/Registration';
import Mnemonic from '../Portfolio/Mnemonic';
import WalletDisplay from '../Portfolio/WalletDisplay';
import Login from '../Portfolio/Login';
import PasswordInput from '../Portfolio/PasswordInput';
import MnemonicImport from '../Portfolio/MnemonicImport';
import {isLoggedIn} from '../../utils/ethersTools';
import {RootStateOrAny, useSelector} from 'react-redux';
import CurrentETHPrice from '../CurrentETHPrice';

const PortfolioNavigator:React.FC = () => {
    const Portfolio = createStackNavigator()
    // const [initialRoute,setInitialRoute] = useState<string>('')
    // const wallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)
    // // useEffect(() => {
    // //     if (wallet === {} ) {
    // //         setInitialRoute('Registration')
    // //     } else {
    // //         setInitialRoute('WalletDisplay')
    // //     }
    // // },[wallet])

    return (
        <Portfolio.Navigator
        initialRouteName='Registration'
        screenOptions={{
            header: () => <CurrentETHPrice/>
        }}
        >
            <Portfolio.Screen name='Registration' component={Registration}/>
            <Portfolio.Screen name='Mnemonic' component={Mnemonic}/>
            <Portfolio.Screen name='MnemonicImport' component={MnemonicImport}/>
            <Portfolio.Screen name='WalletDisplay' component={WalletDisplay}/>
            <Portfolio.Screen name='PasswordInput' component={PasswordInput}/>
            <Portfolio.Screen name='Login' component={Login}/>
        </Portfolio.Navigator>
    )
}

export default PortfolioNavigator
