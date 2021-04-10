import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import TouchableButton from '../common/TouchableButton';
import FormikTextInput from '../common/FormikTextInput';
import { useNavigation } from '@react-navigation/native'
import * as yup from 'yup'
import {encryptWallet} from '../../utils/ethersTools';
import {RootStateOrAny, useSelector, useDispatch} from 'react-redux';
import {Wallet} from 'ethers';
import theme from '../../theme';
import {setSeed} from '../../reducers/jsonSeedReducer';

const validationSchema = yup.object().shape({
    password: yup
        .string()
        .min(6, 'Password should be at least 6 characters long')
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null],'Passwords must match')
})

const PasswordInput:React.FC = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const wallet:Wallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)
    console.log(wallet)
    const onSubmit = async ({password}: {password:string}) => {
        // Encrypting the wallet on Native version for some reason takes up to 3-4 minutes
        //
        // const jsonSeed = await wallet.encrypt(password)
        // console.log(JSON.parse(jsonSeed))
        // dispatch(setSeed(jsonSeed))
        navigation.navigate('WalletDisplay')
    }

    return(
        <View style={{flex: 1,backgroundColor: theme.colors.background, paddingTop: theme.distance.small}}>
            <Formik onSubmit={onSubmit} initialValues={{password:'', passwordConfirmation: ''}} validationSchema={validationSchema}>
                {({handleSubmit})=>(
                    <View>
                        {/*@ts-ignore*/}
                        <FormikTextInput name='password' placeholder='Enter the password' secureTextEntry/>
                        {/*@ts-ignore*/}
                        <FormikTextInput name='passwordConfirmation' placeholder='Password confirmation' secureTextEntry/>
                        <TouchableButton text='Confirm the password' onPress={handleSubmit}/>
                    </View>)}
            </Formik>
        </View>
    )
}

export default PasswordInput
