import React, {useEffect, useState} from 'react'
import {View, Text, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {RootStateOrAny, useSelector, useDispatch} from 'react-redux';
import {BigNumber, Wallet, ethers} from 'ethers';
import theme, {commonStyles} from '../../theme';
import TouchableButton from './TouchableButton';
import {getCurrentGas} from '../../utils/ethersTools';
import {GWEI_IN_ETH} from '../../constants';
import {setModal} from '../../reducers/modalReducer';

const TransactionModal:React.FC = () => {
    const dispatch = useDispatch()
    const wallet:Wallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)
    const isModalVisible:boolean = useSelector((state:RootStateOrAny) => state.modal.visible)
    const [currentGas,setCurrentGas] = useState<number>(0)

    const toggleModal = () => dispatch(setModal(!isModalVisible))
    const deviceWidth = Dimensions.get('window').width
    const deviceHeight = Dimensions.get('window').height

    useEffect(() => {
        const updateGas = async () => {
            const bigNumberishGas:BigNumber = await getCurrentGas(wallet)
            setCurrentGas(bigNumberishGas.toNumber() / GWEI_IN_ETH)
        }
        updateGas()
    },[wallet])

    return(
        <Modal
            isVisible={isModalVisible}
            deviceHeight={deviceHeight}
            deviceWidth={deviceWidth}
            onBackdropPress={() => toggleModal()}
        >
            <View style={{flex: 1, backgroundColor: theme.colors.background}}>
                <Text style={commonStyles.tileText}>Current gas price: {currentGas} gwei</Text>
                <TouchableButton text='Hide modal' onPress={() => toggleModal()}/>
            </View>
        </Modal>
    )
}

export default TransactionModal
