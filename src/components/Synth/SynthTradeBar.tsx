import React, {useState,useEffect} from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import theme, {commonStyles} from '../../theme';
import TouchableButton from '../common/TouchableButton';
import {SynthData} from '../../types';
import FormikTextInput from '../common/FormikTextInput';
import {Formik , useFormikContext, useField, Field} from 'formik';

interface TradeFormikValues {
    sUSDValue: string,
    synthValue: string
}

const SynthTradeBar:React.FC<{exchangedSynth: SynthData}> = ({exchangedSynth}) => {
    const initialValues:TradeFormikValues = { sUSDValue:String(exchangedSynth.formattedRate), synthValue:'1'}
    const [isInverted,setIsInverted] = useState<boolean>(false)
    if (!isInverted) return (
        <View style={{flex: 1, backgroundColor: theme.colors.background}}>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => alert(JSON.stringify(values,null,2))}
            >
                {({handleSubmit, setFieldValue}) => (
                    <View>
                        <Text style={{...commonStyles.tileText, marginHorizontal:theme.distance.tiny}}>Sell: sUSD</Text>
                        <FormikTextInput name='sUSDValue'
                                         placeholder='Amount of sUSD'
                                         addOnChange={(text:string) => {setFieldValue('synthValue',String(Number(text) / exchangedSynth.formattedRate))}}
                        />

                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <TouchableOpacity onPress={() => setIsInverted(!isInverted)}>
                                <Ionicons name="swap-vertical" size={36} color={theme.colors.textWhite}/>
                            </TouchableOpacity>
                        </View>

                        <Text style={{...commonStyles.tileText, marginHorizontal:theme.distance.tiny}}>Buy: {exchangedSynth.name}</Text>
                        <FormikTextInput name='synthValue'
                                         placeholder={`Amount of ${exchangedSynth.name}`}
                                         addOnChange={(text:string) => {setFieldValue('sUSDValue',String(Number(text) * exchangedSynth.formattedRate))}}
                        />
                        <TouchableButton text='Trade' onPress={() => handleSubmit}/>
                    </View>
                )}
            </Formik>
        </View>
    ); else return(
        <View style={{flex: 1, backgroundColor: theme.colors.background}}>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => alert(JSON.stringify(values,null,2))}
            >
                {({handleSubmit, setFieldValue}) => (
                    <View>
                        <Text style={{...commonStyles.tileText, marginHorizontal:theme.distance.tiny}}>Sell: {exchangedSynth.name}</Text>
                        <FormikTextInput name='synthValue'
                                         placeholder={`Amount of ${exchangedSynth.name}`}
                                         addOnChange={(text:string) => {setFieldValue('sUSDValue',String(Number(text) * exchangedSynth.formattedRate))}}
                        />


                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <TouchableOpacity onPress={() => setIsInverted(!isInverted)}>
                                <Ionicons name="swap-vertical" size={36} color={theme.colors.textWhite}/>
                            </TouchableOpacity>
                        </View>

                        <Text style={{...commonStyles.tileText, marginHorizontal:theme.distance.tiny}}>Buy: sUSD</Text>
                        <FormikTextInput name='sUSDValue'
                                         placeholder='Amount of sUSD'
                                         addOnChange={(text:string) => {setFieldValue('synthValue',String(Number(text) / exchangedSynth.formattedRate))}}
                        />
                        <TouchableButton text='Trade' onPress={() => handleSubmit}/>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default SynthTradeBar


