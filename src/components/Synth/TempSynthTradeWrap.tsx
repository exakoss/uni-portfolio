import React from 'react'
import SynthTradeBar from './SynthTradeBar';
import {View} from 'react-native';
import theme from '../../theme';
import {SynthData} from '../../types';

const mockSynth:SynthData = {
    formattedRate: 1500,
    asset: "XMR",
    category: "crypto",
    description: "Monero",
    name: "sXMR",
    sign: "",
}

const TempSynthTradeWrap:React.FC = () => {
    return(
        <View style={{flex: 1, backgroundColor: theme.colors.background}}>
            <SynthTradeBar exchangedSynth={mockSynth}/>
        </View>
    )
}

export default TempSynthTradeWrap
