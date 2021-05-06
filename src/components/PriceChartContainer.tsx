import React from 'react'
import {View} from 'react-native'
import Plotly from 'react-native-plotly'
import theme from '../theme'

interface PriceChartData {
    x: String[],
    y: Number[],
    type?: 'scatter',
    name?: string,
    line: {color: string,dash?:'solid' | 'dashdot' | 'dot'},
    fill?: 'tozeroy'
}

const PriceChartContainer:React.FC<{priceArray:number[],datesArray:string[]}> = ({priceArray,datesArray}) => {
    console.log('Price chart prices')
    console.log(priceArray)
    console.log('Price chart dates')
    console.log(datesArray)
    const mainData:PriceChartData = {
        x:datesArray,
        y:priceArray,
        type: 'scatter',
        line: {color: theme.colors.primary},
        name: 'Price'
    }
    const averagePrice = priceArray.reduce( ( p, c ) => p + c, 0 ) / priceArray.length
    const upperRangeLimit = averagePrice * 1.05
    const lowerRangeLimit = averagePrice * 0.95
    const averageData:PriceChartData = {
        x:datesArray,
        y:new Array(priceArray.length).fill(averagePrice),
        line: {color: theme.colors.warning, dash: 'dot'},
        name: 'Average price'
    }
    const layout = {
        xaxis: {
            title: 'Date',
            type: 'date',
            gridcolor: theme.colors.textSecondary
        },
        yaxis: {
            title: 'Price in $',
            range: [lowerRangeLimit,upperRangeLimit],
            gridcolor: theme.colors.textSecondary,
        },
        plot_bgcolor: theme.colors.background,
        paper_bgcolor: theme.colors.background,
        font: {
            color:theme.colors.textWhite
        }
    }
    return(
            <Plotly
                data={[mainData,averageData]}
                config={{displayModeBar : false}}
                layout={layout}
            />
    )
}

export default PriceChartContainer
