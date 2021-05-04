import React from 'react'
import {View} from 'react-native'
import Plotly from 'react-native-plotly'
import theme from '../theme'

interface PriceChartData {
    x: String[],
    y: Number[],
    type: 'scatter',
    line: {color: string},
    fill: 'tozeroy'
}

const PriceChart:React.FC<{priceArray:number[],datesArray:string[]}> = ({priceArray,datesArray}) => {
    const chartData:PriceChartData[] = [{
        x:datesArray,
        y:priceArray,
        type: 'scatter',
        line: {color: theme.colors.primary},
        fill: 'tozeroy'
    }]
    const upperRangeLimit = Math.max(...priceArray) + 500
    const lowerRangeLimit = Math.min(...priceArray) - 500
    const layout = {
        xaxis: {
            title: 'Date',
            type: 'date'
        },
        yaxis: {
            title: 'Price in $',
            range: [lowerRangeLimit,upperRangeLimit]
        },
        plot_bgcolor: theme.colors.background,
        paper_bgcolor: theme.colors.background,
        font: {
            color:theme.colors.textWhite
        }
    }
    return(
        <View style={{flex:1}}>
            <Plotly
                data={chartData}
                config={{displayModeBar : false}}
                layout={layout}
            />
        </View>
    )
}

export default PriceChart
