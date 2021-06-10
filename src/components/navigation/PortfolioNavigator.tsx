import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Registration from '../Portfolio/Registration';
import Mnemonic from '../Portfolio/Mnemonic';
import WalletDisplay from '../Portfolio/WalletDisplay';
import Login from '../Portfolio/Login';
import PasswordInput from '../Portfolio/PasswordInput';
import MnemonicImport from '../Portfolio/MnemonicImport';
// import CurrentETHPrice from '../CurrentETHPrice';
import CurrentPriceHeader from '../CurrentPriceHeader';

const PortfolioNavigator:React.FC = () => {
    const Portfolio = createStackNavigator()

    return (
        <Portfolio.Navigator
        initialRouteName='Registration'
        screenOptions={{
            header: () => <CurrentPriceHeader/>
        }}
        >
            <Portfolio.Screen name='Registration' component={Registration}/>
            <Portfolio.Screen name='Mnemonic' component={Mnemonic}/>
            <Portfolio.Screen name='MnemonicImport' component={MnemonicImport}/>
            <Portfolio.Screen
                name='WalletDisplay'
                component={WalletDisplay}
                listeners={{
                    beforeRemove: (e) => {
                        //Fix this possibly with an explicit type declaration
                        //@ts-ignore
                        e.preventDefault()
                    }
                }}
            />
            <Portfolio.Screen name='PasswordInput' component={PasswordInput}/>
            <Portfolio.Screen name='Login' component={Login}/>
        </Portfolio.Navigator>
    )
}

export default PortfolioNavigator
