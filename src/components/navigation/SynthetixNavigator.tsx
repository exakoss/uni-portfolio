import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CurrentETHPrice from '../CurrentETHPrice';
import SynthWelcome from '../Synth/SynthWelcome';
import SynthDisplay from '../Synth/SynthDisplay';

const SynthetixNavigator:React.FC = () => {

    const Synth = createStackNavigator()

    return(
        <Synth.Navigator
        initialRouteName='SynthDisplay'
        screenOptions={{
            header: () => <CurrentETHPrice/>
        }}
        >
            <Synth.Screen name='SynthWelcome' component={SynthWelcome}/>
            <Synth.Screen name='SynthDisplay' component={SynthDisplay}/>
        </Synth.Navigator>
    )
}

export default SynthetixNavigator
