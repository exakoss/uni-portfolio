import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import CurrentETHPrice from '../CurrentETHPrice';
import SynthWelcome from '../Synth/SynthWelcome';
import SynthDisplay from '../Synth/SynthDisplay';
import CurrentPriceHeader from '../CurrentPriceHeader';

const SynthetixNavigator:React.FC = () => {

    const Synth = createStackNavigator()

    return(
        <Synth.Navigator
        initialRouteName='SynthDisplay'
        screenOptions={{
            header: () => <CurrentPriceHeader headerToken='SXN'/>
        }}
        >
            <Synth.Screen name='SynthWelcome' component={SynthWelcome}/>
            <Synth.Screen name='SynthDisplay' component={SynthDisplay}/>
        </Synth.Navigator>
    )
}

export default SynthetixNavigator
