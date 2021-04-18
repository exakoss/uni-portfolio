import React, {useState,useEffect} from 'react'
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import theme, {commonStyles} from '../../theme';
import TouchableButton from '../common/TouchableButton';
import {SynthData} from '../../types';
import FormikTextInput from '../common/FormikTextInput';
import {Formik} from 'formik';
import TransactionModal from '../common/TransactionModal';
import {RootStateOrAny, useSelector, useDispatch} from 'react-redux';
import {setModal} from '../../reducers/modalReducer';


interface TradeFormikValues {
    sUSDValue: string,
    synthValue: string
}

const SynthTradeBar:React.FC<{exchangedSynth: SynthData}> = ({exchangedSynth}) => {
    const dispatch = useDispatch()
    const initialValues:TradeFormikValues = { sUSDValue:String(exchangedSynth.formattedRate), synthValue:'1'}
    const [isInverted,setIsInverted] = useState<boolean>(false)
    const isModalVisible:boolean = useSelector((state:RootStateOrAny) => state.modal.visible)
    const toggleModal = () => dispatch(setModal(!isModalVisible))
    //My eyes are bleeding while writing this code but it works for now
    //Fix later with custom React components and Formik fields
    if (!isInverted) return (
        <View style={{flex: 1, backgroundColor: theme.colors.background}}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {}}
            >
                {({handleSubmit, setFieldValue, values}) => (
                    <View>
                        <Text style={{color: theme.colors.textWhite, textAlign: "center", fontSize: 30}}>BUY/SELL</Text>
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
                        <Text style={{...commonStyles.nameText, marginHorizontal:theme.distance.tiny}}>Exchange fee (0.30%): ${Number(values.sUSDValue) * 0.003}</Text>
                        <TouchableButton text='Trade' onPress={() => {
                            // Alert.alert(`Error: insufficient funds`)
                            toggleModal()
                        }} style={{backgroundColor: theme.colors.green}}/>
                        <TransactionModal/>
                    </View>
                )}
            </Formik>
        </View>
    ); else return(
        <View style={{flex: 1, backgroundColor: theme.colors.background}}>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => Alert.alert(`Error: insufficient funds`)}
            >
                {({handleSubmit, setFieldValue, values}) => (
                    <View>
                        <Text style={{color: theme.colors.textWhite, textAlign: "center", fontSize: 30}}>BUY/SELL</Text>
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
                        <Text style={{...commonStyles.nameText, marginHorizontal:theme.distance.tiny}}>Exchange fee (0.30%): ${Number(values.sUSDValue) * 0.003}</Text>
                        <TouchableButton text='Trade' onPress={() => {
                            // Alert.alert(`Error: insufficient funds`)
                            toggleModal()
                        }} style={{backgroundColor: theme.colors.green}}/>
                        <TransactionModal/>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default SynthTradeBar


