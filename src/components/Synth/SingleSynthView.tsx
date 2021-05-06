import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import theme from '../../theme';
import {SynthDataExtended} from '../../types';
import {RootStateOrAny, useSelector} from 'react-redux';
import {SynthetixJS} from '@synthetixio/js';
import {
    createMainnetSnxjs,
    fetchSynthSupply,
    findSynthByName,
    getLatestSynthRate,
    getSynthRateByBlock,
    getSynthSupplyInUSD,
    getSynthVolumeInUSD
} from '../../utils/synthTools';
import {getBlockNumber} from '../../utils';
import {SingleTokenStat} from '../SingleTokenView';
import LoadingScreen from '../LoadingScreen';
import SynthTradeBar from './SynthTradeBar';
import PriceChart from '../PriceChart';

const SingleSynthView:React.FC = () => {
    const route = useRoute();
    //@ts-ignore
    const { synthName } = route.params
    const initialState:SynthDataExtended = {
        synth: {
            name: synthName,
            asset: '',
            category: '',
            sign: '',
            description: 'Synth description'
            },
        formattedRate: 0,
        formattedRateDaily: 0,
        volumeInUSD: 0,
        dailyVolumeInUSD: 0,
        supplyInUSD: 0,
        dailySupplyInUSD: 0
    }
    const [extendedSynth, setExtendedSynth] = useState<SynthDataExtended>(initialState)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const dailyBlockNumber = useSelector((state:RootStateOrAny) => state.dailyBlock.blockNumber)

    useEffect(() => {
        const updateSynthData = async () => {
            const snxjs:SynthetixJS = createMainnetSnxjs()
            const synth = findSynthByName(snxjs,synthName)
            if (synth) {
                const newCurrentBlock = await getBlockNumber('CURRENT_DAY').then(result => result)
                const currentSynthRate = await getLatestSynthRate(synthName)
                const dailySynthRate = await getSynthRateByBlock(synthName,dailyBlockNumber)
                const synthVolumeInUSD = await getSynthVolumeInUSD(synthName,'sUSD','ONE_DAY')
                const dailySynthVolumeInUSD = await getSynthVolumeInUSD(synthName,'sUSD','TWO_DAYS')
                const currentSynthSupply = await fetchSynthSupply(snxjs,synth,{blockTag:newCurrentBlock})
                const dailySynthSupply = await fetchSynthSupply(snxjs,synth,{blockTag:dailyBlockNumber})
                const currentSynthSupplyInUSD = getSynthSupplyInUSD(currentSynthSupply,currentSynthRate)
                const dailySynthSupplyInUSD = getSynthSupplyInUSD(dailySynthSupply,dailySynthRate)
                setExtendedSynth({
                    synth:synth,
                    formattedRate: currentSynthRate,
                    formattedRateDaily: dailySynthRate,
                    volumeInUSD: synthVolumeInUSD,
                    dailyVolumeInUSD: dailySynthVolumeInUSD,
                    supplyInUSD: currentSynthSupplyInUSD,
                    dailySupplyInUSD:dailySynthSupplyInUSD
                })
                setIsLoading(false)
            }
        }
        updateSynthData()
    },[])
    if (isLoading) return <LoadingScreen placeholder='Loading synth data...'/>
    return (
        <ScrollView style={{flex: 1,backgroundColor: theme.colors.background}}>
            <View style={{flex: 1,backgroundColor: theme.colors.background}}>
                <Text style={{
                    color: theme.colors.textWhite,
                    fontSize: theme.fontsize.big,
                    textAlign: 'center',
                    marginBottom: theme.distance.tiny
                }}>{extendedSynth.synth.description}</Text>
                <SingleTokenStat title='Current price' currentValue={extendedSynth.formattedRate} previousValue={extendedSynth.formattedRateDaily} isUSD={true}/>
                <SingleTokenStat title='Volume 24 h:' currentValue={extendedSynth.volumeInUSD} previousValue={extendedSynth.dailyVolumeInUSD - extendedSynth.volumeInUSD} isUSD={true}/>
                <SingleTokenStat title='Total supply' currentValue={extendedSynth.supplyInUSD} previousValue={extendedSynth.dailySupplyInUSD} isUSD={true}/>
                <PriceChart id={synthName} dataSource='SYNTH'/>
                <SynthTradeBar exchangedSynth={{...extendedSynth.synth,formattedRate: extendedSynth.formattedRate}}/>
            </View>
        </ScrollView>
    )
}

export default SingleSynthView
