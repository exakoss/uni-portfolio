import React, {useState,useEffect} from 'react'
import {View} from 'react-native'
import LoadingScreen from './LoadingScreen';
import {Block, DataSource} from '../types';
import PriceChartContainer from './PriceChartContainer';
import {generateDates, getCorrespondingBlocksFromTimestamps} from '../utils';
import {getPriceChartPrices} from '../utils/synthTools';

const PriceChart:React.FC<{id:string,dataSource:DataSource}> = ({id,dataSource}) => {
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [priceChartPrices,setPriceChartPrices] = useState<number[]>([])
    const [priceChartTimestamps,setPriceChartTimestamps] = useState<string[]>([])

    useEffect(() => {
        const updatePriceChartData = async () => {
            const {unixTimestamps,plotlyTimestamps} = generateDates(24)
            const blocks:Block[] = await getCorrespondingBlocksFromTimestamps(unixTimestamps)
            const parsedPrices = await getPriceChartPrices(blocks,id,dataSource)
            const parsedPricesNumbers = parsedPrices.map(p => p.formattedRate)
            setPriceChartPrices(parsedPricesNumbers)
            setPriceChartTimestamps(plotlyTimestamps)
            setIsLoading(false)
        }
        updatePriceChartData()
    },[])

    if (isLoading) return <LoadingScreen placeholder='Price chart is loading...'/>
    return(
        <View style={{flex: 1, height: 500, width:400}}>
            <PriceChartContainer priceArray={priceChartPrices} datesArray={priceChartTimestamps}/>
        </View>
    )
}

export default PriceChart
