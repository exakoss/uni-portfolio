import React, {useEffect, useState} from 'react'
import {View} from 'react-native';
import theme from '../../theme';
import {SynthDataDaily} from '../../types';
import SynthList from './SynthList'
import {RootStateOrAny, useSelector} from 'react-redux';
import {createMainnetSnxjs, listAllSynths, getSynthsQuotesByBlock} from '../../utils/synthTools';
import {SynthetixJS} from '@synthetixio/js';
import {getBlock} from '../../utils';

const initialSynthData:SynthDataDaily[] = []

const SynthDisplay:React.FC = () => {
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [synthDataDaily, setSynthDataDaily] = useState<SynthDataDaily[]>(initialSynthData)
    const listPlaceholder = 'The synth list is currently empty'
    const dailyBlockNumber = useSelector((state:RootStateOrAny) => state.dailyBlock.blockNumber)

    useEffect(() => {
            const fetchAndUpdateSynthData = async () => {
                const snxjs:SynthetixJS = createMainnetSnxjs()
                const synthList = listAllSynths(snxjs)
                const newCurrentBlock = await getBlock('CURRENT_DAY').then(result => result)
                const currentSynths = await getSynthsQuotesByBlock(snxjs,synthList,{blockTag: newCurrentBlock}).then(result => result)
                const dailySynths = await getSynthsQuotesByBlock(snxjs,synthList,{blockTag: dailyBlockNumber})
                const passedSynths:SynthDataDaily[] = currentSynths.map((s) => {
                    // @ts-ignore
                    const dailyRate:number = (dailySynths.find(sd => sd.name === s.name) === undefined) ? 0 : dailySynths.find(sd => sd.name === s.name).formattedRate
                    return {
                        ...s,
                        formattedRateDaily:dailyRate
                    }
                })
                setSynthDataDaily(passedSynths)
                setIsLoading(false)
            }
            fetchAndUpdateSynthData()
        }
    ,[])

    return(
        <View style={{flex: 1,backgroundColor: theme.colors.background}}>
            <SynthList synthsDaily={synthDataDaily} placeholder={listPlaceholder} isLoading={isLoading}/>
        </View>
    )
}

export default SynthDisplay
