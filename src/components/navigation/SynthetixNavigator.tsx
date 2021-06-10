import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SynthDisplay from '../Synth/SynthDisplay';
import CurrentPriceHeader from '../CurrentPriceHeader';

const SynthetixNavigator:React.FC = () => {

    const Synth = createStackNavigator()

    return(
        <Synth.Navigator
        initialRouteName='SynthDisplay'
        screenOptions={{
            header: () => <CurrentPriceHeader/>
        }}
        >
            <Synth.Screen name='SynthDisplay' component={SynthDisplay}/>
        </Synth.Navigator>
    )
}

export default SynthetixNavigator
