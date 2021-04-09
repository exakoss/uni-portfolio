import React, {useState,useEffect} from 'react'
import {View, Text} from 'react-native';
import theme from '../../theme';
import TouchableButton from '../common/TouchableButton';
import {SynthData} from '../../types';
import TextInput from '../common/TextInput';


const SynthTradeBar:React.FC<{exchangedSynth: SynthData}> = ({exchangedSynth}) => {
    const [isInverted,setIsInverted] = useState<boolean>(false)
    const [value1,setValue1] = useState<number>(exchangedSynth.formattedRate)
    const [value2,setValue2] = useState<number>(1)

    useEffect(() => {
        console.log('useEffect1 got triggered')
        setValue2(value1*exchangedSynth.formattedRate)
    },[value1])

    useEffect(() => {
        console.log('useEffect2 got triggered')
        setValue1(value2 / exchangedSynth.formattedRate)
    },[value2])

    return(
        <View style={{flex: 1, backgroundColor: theme.colors.background}}>
            <View>
                <Text>Sell: sUSD</Text>
                <View>
                    <TextInput
                        value={String(value1)}
                        onChangeText={(text:string) => setValue1(Number(text))}
                    />
                </View>
            </View>
            <View>
                <Text>Buy: {exchangedSynth.name}</Text>
                <View>
                    <TextInput
                        value={String(value2)}
                        onChangeText={(text:string) => setValue2(Number(text))}
                    />
                </View>
            </View>
            <TouchableButton text='Trade' onPress={() => null}/>
        </View>
    )
}

export default SynthTradeBar


