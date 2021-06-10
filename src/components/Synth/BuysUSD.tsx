import React from 'react';
import {View,Text} from 'react-native'
import FormikTextInput from '../common/FormikTextInput';
import {Formik} from 'formik';
import theme from '../../theme';
import {exchangeETHForSUSD} from '../../utils/transactions';
import TouchableButton from '../common/TouchableButton';
import {Wallet} from 'ethers';
import {RootStateOrAny, useSelector} from 'react-redux';
import {createConnectedSnxjs} from '../../utils/synthTools';
import {SynthetixJS} from '@synthetixio/js';

const BuysUSD:React.FC = () => {

    const snxjs = createConnectedSnxjs()
    const onSubmit = async ({ethAmount}: {ethAmount:string}) => {
        await exchangeETHForSUSD(snxjs as SynthetixJS,Number(ethAmount))
    }

    return(
        <View style={{flex:1, backgroundColor:theme.colors.background}}>
            <Formik initialValues={{ethAmount: '1'}} onSubmit={onSubmit}>
                {({handleSubmit}) => (
                    <View>
                        <FormikTextInput name='ethAmount' placeholder='Input the amount of ETH you would like to exchange'/>
                        <TouchableButton text='Trade' onPress={handleSubmit}/>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default BuysUSD
