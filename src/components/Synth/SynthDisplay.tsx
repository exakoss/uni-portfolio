import React, {useEffect, useState} from 'react'
import {View} from 'react-native';
import theme from '../../theme';
import {SynthDataDaily,TokenListEntry} from '../../types';
import {RootStateOrAny, useSelector} from 'react-redux';
import {createMainnetSnxjs, listAllSynths, getSynthsQuotesByBlock, getLatestSynthsDatas} from '../../utils/synthTools';
import {SynthetixJS} from '@synthetixio/js';
import {getBlock} from '../../utils';
import TokenList from '../TokenList';

const SynthDisplay:React.FC = () => {
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [tokenData,setTokenData] = useState<TokenListEntry[]>([])
    const listPlaceholder = 'The synth list is currently empty'
    const dailyBlockNumber = useSelector((state:RootStateOrAny) => state.dailyBlock.blockNumber)

    useEffect(() => {
            const fetchAndUpdateSynthData = async () => {
                const snxjs:SynthetixJS = createMainnetSnxjs()
                const synthList = listAllSynths(snxjs)
                const currentSynths = await getLatestSynthsDatas(synthList)
                const dailySynths = await getSynthsQuotesByBlock(snxjs,synthList,{blockTag: dailyBlockNumber})
                const passedSynths:TokenListEntry[] = currentSynths.map((s) => {
                    // @ts-ignore
                    const dailyRate:number = (dailySynths.find(sd => sd.name === s.name) === undefined) ? 0 : dailySynths.find(sd => sd.name === s.name).formattedRate
                    return {
                        ...s,
                        dataSource: "SYNTH",
                        formattedRateDaily:dailyRate
                    }
                })
                setTokenData(passedSynths)
                setIsLoading(false)
            }
            fetchAndUpdateSynthData()
        }
    ,[])

    return(
        <View style={{flex: 1,backgroundColor: theme.colors.background}}>
            <TokenList tokens={tokenData} placeholder={listPlaceholder} isLoading={isLoading}/>
        </View>
    )
}

export default SynthDisplay
