import React from 'react'
import LoadingScreen from '../LoadingScreen';
import {ItemSeparator, PercentageChange} from '../BaseTokenList';
import {SynthDataDaily} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {FlatList, Text, View} from 'react-native';
import theme, {commonStyles} from '../../theme';

interface Props {
    synthsDaily: SynthDataDaily[],
    placeholder: string,
    isLoading: boolean
}

const SynthTile:React.FC<{synthDaily: SynthDataDaily}> = ({synthDaily}) => {
    return(
        <View style={commonStyles.tile}>
            <View style={commonStyles.nameContainer}>
                <Text style={commonStyles.tileText}>{synthDaily.name}</Text>
                <Text style={commonStyles.nameText}>{synthDaily.description}</Text>
            </View>
            <Text style={commonStyles.tileText}> ${synthDaily.formattedRate}</Text>
            <PercentageChange currentPrice={synthDaily.formattedRate} dailyPrice={synthDaily.formattedRateDaily}/>
        </View>
    )
}

const SynthList:React.FC<Props> = ({placeholder,isLoading,synthsDaily}) => {
    if (isLoading) return <LoadingScreen placeholder='Loading synth data...'/>
    const navigation = useNavigation()
    if (synthsDaily.length === 0) return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text style={{color: theme.colors.textWhite, fontSize: 24, textAlign: "center"}}>{placeholder}</Text></View>
    else {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={synthsDaily}
                    ItemSeparatorComponent={ItemSeparator}
                    renderItem={({item}) => <SynthTile synthDaily={item}/>}
                />
            </View>
        )
    }
}

export default SynthList
