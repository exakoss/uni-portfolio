import React from 'react'
import {FlatList, Text, View, TouchableOpacity, Alert} from 'react-native';
import LoadingScreen from '../LoadingScreen';
import {ItemSeparator, PercentageChange} from '../BaseTokenList';
import {SynthDataDaily} from '../../types';
import {useNavigation} from '@react-navigation/native';
import theme, {commonStyles} from '../../theme';
import {toMoney} from '../../utils';
import {Wallet} from 'ethers';
import {RootStateOrAny, useSelector} from 'react-redux';

interface Props {
    synthsDaily: SynthDataDaily[],
    placeholder: string,
    isLoading: boolean
}

const SynthTile:React.FC<{synthDaily: SynthDataDaily}> = ({synthDaily}) => {
    return(
        <View style={commonStyles.tile} key={synthDaily.name}>
            <View style={commonStyles.nameContainer}>
                <Text style={commonStyles.tileText}>{synthDaily.name}</Text>
                <Text style={commonStyles.nameText}>{synthDaily.description}</Text>
            </View>
            <Text style={commonStyles.tileText}> {toMoney(synthDaily.formattedRate,3)}</Text>
            <PercentageChange currentPrice={synthDaily.formattedRate} dailyPrice={synthDaily.formattedRateDaily}/>
        </View>
    )
}

const SynthList:React.FC<Props> = ({placeholder,isLoading,synthsDaily}) => {
    if (isLoading) return <LoadingScreen placeholder='Loading synth data...'/>
    const navigation = useNavigation()
    const wallet:Wallet | {} = useSelector((state:RootStateOrAny) => state.wallet.wallet)
    console.log('wallet in synth list')

    console.log(wallet)
    if (synthsDaily.length === 0) return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text style={{color: theme.colors.textWhite, fontSize: 24, textAlign: "center"}}>{placeholder}</Text></View>

    const handleNavigationToSynthTile = (wallet:Wallet | {},synthName:string) => {
        if (wallet === {}) {
            Alert.alert(`You do not have any signer connected. Please switch to Portfolio tab to log in or create a wallet.`)
        } else {
            navigation.navigate('SingleSynthView',{synthName: synthName})
        }
    }
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={synthsDaily}
                    ItemSeparatorComponent={ItemSeparator}
                    renderItem={({item}) =>
                        <TouchableOpacity onPress={() => handleNavigationToSynthTile(wallet,item.name)}>
                            <SynthTile synthDaily={item} key={item.name}/>
                        </TouchableOpacity>
                    }
                />
            </View>
        )
}

export default SynthList
