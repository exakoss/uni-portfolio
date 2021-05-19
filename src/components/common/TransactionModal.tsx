import React, {useEffect, useState} from 'react'
import {View, Text, Dimensions, Alert} from 'react-native';
import Modal from 'react-native-modal';
import {RootStateOrAny, useSelector, useDispatch} from 'react-redux';
import {BigNumber, Wallet, ethers, Transaction} from 'ethers';
import theme, {commonStyles} from '../../theme';
import TouchableButton from './TouchableButton';
import {getCurrentGas} from '../../utils/ethersTools';
import {GWEI_IN_ETH} from '../../constants';
import {setModal} from '../../reducers/modalReducer';
import {SynthExchangeInput} from '../../types';
import {estimateGasLimitForExchange,exchangeSynthForSynth} from '../../utils/transactions';
import {createConnectedSnxjs} from '../../utils/synthTools';
import {SynthetixJS} from '@synthetixio/js';
import {addPortfolioEntry} from '../../reducers/portfolioReducer';
import {CopyButton} from '../Portfolio/WalletDisplay';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const HashModal:React.FC<{hash:string,isHashVisible:boolean,setIsHashVisible: any}> = ({hash,isHashVisible,setIsHashVisible}) => {

    const dispatch = useDispatch()
    return(
        <Modal
            deviceWidth={deviceWidth}
            deviceHeight={deviceHeight}
            isVisible={isHashVisible}
            onBackdropPress={() => setIsHashVisible(false)}
            style={{
                flex:0,
                backgroundColor: theme.colors.background,
                height: deviceHeight / 3
            }}
        >
                <Text style={{...commonStyles.placeholder,marginBottom:theme.distance.normal}}>Exchange has been initiated, the transaction hash is:</Text>
                <View style={{flexDirection: 'row', marginVertical:theme.distance.normal, justifyContent: 'center'}}>
                    <Text style={{color:theme.colors.textWhite, fontSize: theme.fontsize.big}}>{hash.slice(0,15) + '...'}</Text>
                    <CopyButton text={hash} message='Copied the transaction hash!'/>
                </View>
            <TouchableButton text='ok' onPress={() => {
                setIsHashVisible(false)
                // dispatch(setModal(false))
            }}/>
        </Modal>
    )
}

const TransactionModal:React.FC<{exchangeInput: SynthExchangeInput}> = ({exchangeInput}) => {
    const dispatch = useDispatch()
    const wallet:Wallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)
    const isModalVisible:boolean = useSelector((state:RootStateOrAny) => state.modal.visible)
    const [currentGasPrice,setCurrentGasPrice] = useState<number>(0)
    const [hashModal,setHashModal] = useState<boolean>(false)
    const [hashString,setHashString] = useState<string>('')
    // const [gasLimit,setGasLimit] = useState<number>(0)
    const toggleModal = () => dispatch(setModal(!isModalVisible))
    const snxjs = createConnectedSnxjs()

    useEffect(() => {
        const updateGas = async () => {
            const bigNumberishGas:BigNumber = await getCurrentGas(wallet)
            // const currentGasLimit = await estimateGasLimitForExchange(snxjs as SynthetixJS,exchangeInput.baseKey,exchangeInput.amount,exchangeInput.quoteKey)
            setCurrentGasPrice(bigNumberishGas.toNumber() / GWEI_IN_ETH)
            // setGasLimit(currentGasLimit as number)
        }
        updateGas()
    },[])

    const confirmTransaction = async () => {
        const tx:Transaction = await exchangeSynthForSynth(snxjs as SynthetixJS,exchangeInput.baseKey,exchangeInput.amount,exchangeInput.quoteKey)
        setHashString(tx.hash as string)
        dispatch(addPortfolioEntry({id:exchangeInput.quoteKey,dataSource:'SYNTH'}))
        setHashModal(true)
        // toggleModal()
    }

    return(
        <Modal
            isVisible={isModalVisible}
            deviceHeight={deviceHeight}
            deviceWidth={deviceWidth}
            onBackdropPress={() => toggleModal()}
            style={{
                flex:1,
                backgroundColor: theme.colors.background,
                justifyContent: 'space-between'
            }}
        >
                <View>
                    <Text style={{...commonStyles.placeholder,marginBottom:theme.distance.normal}}>You are about to sell:</Text>
                    <Text style={{...commonStyles.placeholder,marginBottom:theme.distance.normal}}>{exchangeInput.amount.toFixed(2)} {exchangeInput.baseKey} </Text>
                    <Text style={{...commonStyles.placeholder,marginBottom:theme.distance.normal}}>For:</Text>
                    <Text style={{...commonStyles.placeholder,marginBottom:theme.distance.normal}}>{(exchangeInput.amount * exchangeInput.rate)} {exchangeInput.quoteKey} </Text>
                    <Text style={{...commonStyles.placeholder,marginBottom:theme.distance.normal}}>Current gas price: {currentGasPrice} gwei</Text>
                    {/*<Text style={{...commonStyles.placeholder,marginBottom:theme.distance.normal}}>Gas limit: {gasLimit}</Text>*/}
                </View>
                <View>
                    <TouchableButton text='Reject' onPress={() => toggleModal()} style={{backgroundColor: theme.colors.warning}}/>
                    <TouchableButton text='Confirm' onPress={async () => await confirmTransaction()} style={{backgroundColor: theme.colors.green}}/>
                </View>
            <HashModal hash={hashString} isHashVisible={hashModal} setIsHashVisible={setHashModal}/>
        </Modal>
    )
}

export default TransactionModal
